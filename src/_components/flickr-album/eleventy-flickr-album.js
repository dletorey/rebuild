/**
 * 11ty plugin: {% flickrAlbum album %}
 *
 * Takes a Flickr album URL (typically from the page's front matter), fetches
 * the album at build time with the API key from `.env`, and outputs the
 * gallery as plain HTML: a heading, a list of figures, and a link to the
 * album on Flickr. No client-side JavaScript is needed and the key never
 * reaches the browser. Styles live in src/_includes/css/flickr-album.css.
 *
 * Requires: npm i @11ty/eleventy-fetch dotenv
 */
import { AssetCache } from '@11ty/eleventy-fetch';

const ENDPOINT = 'https://api.flickr.com/services/rest/';
const CACHE_DURATION = '1d';

// Sizes requested from Flickr, smallest to largest (m≈240-500, z=640, c=800, l=1024).
const SIZE_SUFFIXES = ['m', 'z', 'c', 'l'];
const EXTRAS = [...SIZE_SUFFIXES.map((s) => `url_${s}`), 'media', 'description'].join(',');

// Flickr's MP4 renditions, best first.
const VIDEO_LABELS = ['HD MP4', 'Site MP4', 'Mobile MP4'];

// Rendered width of one gallery column; keep in step with flickr-album.css.
// The list is 90% of the viewport (max 1200px), split into up to 3 columns of at least 15rem.
const SIZES = '(min-width: 84rem) 400px, (min-width: 52rem) 30vw, (min-width: 34rem) 45vw, 90vw';

// Camera filenames such as IMG_1234, DSC01234 or PXL_20260101_123456 say nothing about the photo.
const FILENAME_TITLE = /^(img|dsc[fn]?|pxl|mvi|vid|gopr|p\d{3}|dji)[_-]?\d[\d_-]*$/i;

/** Extracts the album id from URLs like https://www.flickr.com/photos/USER/albums/ID (or /sets/ID). */
export function parseAlbumUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`flickrAlbum: "${value}" is not a valid URL.`);
  }

  const match = url.pathname.match(/^\/photos\/[^/]+\/(?:albums|sets)\/(\d+)/);
  if (!/(^|\.)flickr\.com$/.test(url.hostname) || !match) {
    throw new Error(
      `flickrAlbum: expected an album URL like https://www.flickr.com/photos/USER/albums/123, got "${value}".`,
    );
  }
  return { id: match[1], url: `https://www.flickr.com${match[0]}` };
}

/** Follows Flickr short links (https://www.flickr.com/gp/USER/CODE) to the album URL they redirect to. */
async function resolveShortLink(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return value; // parseAlbumUrl reports the invalid URL
  }
  if (!/(^|\.)flickr\.com$/.test(url.hostname) || !url.pathname.startsWith('/gp/')) return value;

  const cache = new AssetCache(`flickr-shortlink-${url.pathname}`);
  if (cache.isCacheValid('*')) return cache.getCachedValue();

  const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
  const location = response.headers.get('location');
  if (!location) throw new Error(`flickrAlbum: could not resolve the short link "${value}".`);

  const resolved = new URL(location, url).href;
  await cache.save(resolved, 'text');
  return resolved;
}

// Pages that share an album share one request, so they never read a cache file mid-write.
const inFlight = new Map();

function call(method, params, apiKey) {
  // The cache key deliberately leaves out the API key. Failed responses are not cached.
  const key = `flickr-${method}-${JSON.stringify(params)}`;
  if (!inFlight.has(key)) {
    const request = fetchFromFlickr(key, method, params, apiKey);
    inFlight.set(key, request);
    request.catch(() => inFlight.delete(key)); // let a later page retry after a failure
  }
  return inFlight.get(key);
}

async function fetchFromFlickr(key, method, params, apiKey) {
  const cache = new AssetCache(key);
  if (cache.isCacheValid(CACHE_DURATION)) return cache.getCachedValue();

  const url = new URL(ENDPOINT);
  url.search = new URLSearchParams({
    method,
    api_key: apiKey,
    format: 'json',
    nojsoncallback: '1',
    ...params,
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Flickr request failed (HTTP ${response.status})`);

  const data = await response.json();
  if (data.stat !== 'ok') throw new Error(`Flickr API error ${data.code}: ${data.message}`);

  await cache.save(data, 'json');
  return data;
}

async function fetchVideoSources(photoId, apiKey) {
  const data = await call('flickr.photos.getSizes', { photo_id: photoId }, apiKey);
  const sizes = data.sizes?.size ?? [];
  return VIDEO_LABELS.flatMap((label) =>
    sizes.filter((s) => s.label === label).map((s) => ({ src: s.source, type: 'video/mp4' })),
  );
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Flickr descriptions are HTML; reduce them to plain text. */
function toPlainText(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
      if (code[0] === '#') {
        const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
        return String.fromCodePoint(n);
      }
      return ENTITIES[code.toLowerCase()] ?? entity;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function toItem(photo, owner) {
  const variants = SIZE_SUFFIXES.flatMap((s) =>
    photo[`url_${s}`]
      ? [{ url: photo[`url_${s}`], w: Number(photo[`width_${s}`]), h: Number(photo[`height_${s}`]) }]
      : [],
  );
  if (!variants.length) return null; // private or still processing

  const main = variants.find((v) => v.w >= 640) ?? variants.at(-1);
  const poster = variants.find((v) => v.w >= 800) ?? variants.at(-1);
  const title = (photo.title ?? '').trim();

  return {
    id: photo.id,
    // Filename-style titles are dropped so they're never used as alt text or link text.
    title: FILENAME_TITLE.test(title) ? '' : title,
    description: toPlainText(photo.description?._content),
    type: photo.media === 'video' ? 'video' : 'image',
    pageUrl: `https://www.flickr.com/photos/${owner}/${photo.id}`,
    src: main.url,
    srcset: variants.map((v) => `${v.url} ${v.w}w`).join(', '),
    poster: poster.url,
    width: main.w,
    height: main.h,
  };
}

async function fetchAlbum(albumId, apiKey) {
  const { photoset } = await call(
    'flickr.photosets.getPhotos',
    { photoset_id: albumId, per_page: '500', media: 'all', extras: EXTRAS },
    apiKey,
  );

  const items = photoset.photo.map((p) => toItem(p, photoset.owner)).filter(Boolean);
  await Promise.all(
    items
      .filter((item) => item.type === 'video')
      .map(async (item) => {
        item.sources = await fetchVideoSources(item.id, apiKey).catch(() => []);
      }),
  );

  return { title: photoset.title, items };
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Builds a figure for one photo or video. `n` is its 1-based position, for unique fallback names. */
function renderItem(item, n, albumTitle) {
  const isVideo = item.type === 'video';
  const kind = isVideo ? 'Video' : 'Photo';
  // Each caption link points somewhere different, so each needs its own name.
  const linkText = item.title || `${kind} ${n} on Flickr`;
  // Prefer the Flickr description, which describes what's in the shot; the title is already in the caption.
  const alt = item.description || item.title || `${kind} ${n} from ${albumTitle}`;

  let media;
  if (isVideo && item.sources?.length) {
    // The figcaption names the video. loading="lazy" also defers the poster where supported;
    // elsewhere preload="none" still stops the video file downloading up front.
    const sources = item.sources
      .map(({ src, type }) => `<source src="${escapeHtml(src)}" type="${escapeHtml(type)}">`)
      .join('');
    media =
      `<video controls playsinline preload="none" loading="lazy" poster="${escapeHtml(item.poster)}"` +
      ` width="${item.width}" height="${item.height}">${sources}` +
      `<a href="${escapeHtml(item.pageUrl)}">Watch ${escapeHtml(linkText)}</a></video>`;
  } else {
    // Videos without a playable file show their poster; the caption links to Flickr.
    const imgAlt = isVideo ? `${alt} (video, watch on Flickr)` : alt;
    media =
      `<img src="${escapeHtml(item.src)}" srcset="${escapeHtml(item.srcset)}" sizes="${SIZES}"` +
      ` width="${item.width}" height="${item.height}" alt="${escapeHtml(imgAlt)}" loading="lazy" decoding="async">`;
  }

  const caption = `<figcaption><a href="${escapeHtml(item.pageUrl)}">${escapeHtml(linkText)}</a></figcaption>`;
  return `<li><figure>${media}${caption}</figure></li>`;
}

export default function flickrAlbumPlugin(eleventyConfig) {
  // Usage: {% flickrAlbum album %}  (or {% flickrAlbum %} to read `album` from the page data)
  eleventyConfig.addAsyncShortcode('flickrAlbum', async function (albumUrl = this.ctx?.album) {
    if (!albumUrl) {
      throw new Error('flickrAlbum: add an `album` URL to the page front matter, or pass one to the shortcode.');
    }

    const apiKey = process.env.FLICKR_API_KEY;
    if (!apiKey) throw new Error('flickrAlbum: FLICKR_API_KEY is missing. Add it to your .env file.');

    const album = parseAlbumUrl(await resolveShortLink(albumUrl));
    const data = await fetchAlbum(album.id, apiKey);
    const title = escapeHtml(data.title);

    // No blank lines or indentation, so Markdown pages keep this as one HTML block.
    // role="list" keeps list semantics in Safari, because reset.css removes the bullets.
    return [
      '<section class="flickr-album">',
      `<h2>${title} photos</h2>`,
      '<ul class="flickr-album__list" role="list">',
      ...data.items.map((item, i) => renderItem(item, i + 1, data.title)),
      '</ul>',
      `<p><a href="${escapeHtml(album.url)}">View ${title} album on Flickr</a></p>`,
      '</section>',
    ].join('\n');
  });
}
