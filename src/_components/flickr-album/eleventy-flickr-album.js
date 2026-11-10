/**
 * 11ty plugin: {% flickrAlbum album %}
 *
 * Takes a Flickr album URL (typically from the page's front matter), fetches
 * the album at build time with the API key from `.env`, and outputs a
 * <flickr-album> element carrying the album data as inline JSON.
 * The key never reaches the browser.
 *
 * Requires: npm i @11ty/eleventy-fetch dotenv
 */
import { AssetCache } from '@11ty/eleventy-fetch';

const ENDPOINT = 'https://api.flickr.com/services/rest/';
const CACHE_DURATION = '1d';

// Sizes requested from Flickr, smallest to largest (m≈240-500, z=640, c=800, l=1024).
const SIZE_SUFFIXES = ['m', 'z', 'c', 'l'];
const EXTRAS = [...SIZE_SUFFIXES.map((s) => `url_${s}`), 'media'].join(',');

// Flickr's MP4 renditions, best first.
const VIDEO_LABELS = ['HD MP4', 'Site MP4', 'Mobile MP4'];

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

function toItem(photo, owner) {
  const variants = SIZE_SUFFIXES.flatMap((s) =>
    photo[`url_${s}`]
      ? [{ url: photo[`url_${s}`], w: Number(photo[`width_${s}`]), h: Number(photo[`height_${s}`]) }]
      : [],
  );
  if (!variants.length) return null; // private or still processing

  const main = variants.find((v) => v.w >= 640) ?? variants.at(-1);
  const poster = variants.find((v) => v.w >= 800) ?? variants.at(-1);

  return {
    id: photo.id,
    title: photo.title ?? '',
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

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Stops a "</script>" inside a photo title from ending the JSON block early.
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

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

    // No blank lines or indentation, so Markdown pages keep this as one HTML block.
    // The component swaps the JSON for the photo list, so it sits between the heading and the link.
    return [
      '<flickr-album>',
      `<h2>${escapeAttr(data.title)} photos</h2>`,
      `<script type="application/json">${safeJson(data)}</script>`,
      `<p><a href="${escapeAttr(album.url)}">View ${escapeAttr(data.title)} album on Flickr</a></p>`,
      '</flickr-album>',
    ].join('\n');
  });
}
