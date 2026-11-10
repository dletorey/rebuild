/**
 * <flickr-album> renders a Flickr album as a list of images and videos.
 *
 * Use it through the 11ty shortcode, which fetches the album at build time and
 * embeds it as inline JSON, so no API key reaches the browser:
 *
 *   {% flickrAlbum album %}
 *
 * You can also point it at a JSON file of the same shape with `src="/path.json"`.
 *
 * Light DOM, so your site CSS applies. The shortcode also outputs an <h2> with
 * the album name and a link to the album on Flickr; the list goes between them.
 *
 * Customise with CSS custom properties:
 *   --flickr-album-gap, --flickr-album-size, --flickr-album-ratio
 * Events: `flickr-album:load` (detail: album) and `flickr-album:error`.
 */

const sheet = new CSSStyleSheet();
sheet.replaceSync(/* css */ `
  :where(flickr-album) { display: block; }
  :where(flickr-album .flickr-album__list) {
    column-count: 3; /* Number of columns on large screens */
    column-gap: var(--sp-xs-s); /* Space between columns */
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  :where(flickr-album .flickr-album__list li figure) {
    break-inside: avoid; /* Prevents images from splitting across columns */
    margin-bottom: var(--sp-xs-s); /* Space between stacked items */
  }
  
  :where(flickr-album .flickr-album__list li figure img) {
    width: 100%;
    height: auto;
    display: block;
    border-radius:  var(--sp-2xs-xs);;
  }
  
  /* Responsive adjustments */
  @media (max-width: 900px) {
    .flickr-album__list {
      column-count: 2;
    }
  }
  
  @media (max-width: 600px) {
    .flickr-album__list {
      column-count: 1;
    }
  }
  :where(flickr-album video) { background: #000; object-fit: contain; }
`);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

class FlickrAlbum extends HTMLElement {
  static observedAttributes = ['src'];

  #controller;
  #inline;
  #list;
  #queued = false;

  connectedCallback() {
    this.#queue();
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.#queue();
  }

  // Load once, even if several changes land in the same tick.
  #queue() {
    if (this.#queued) return;
    this.#queued = true;
    queueMicrotask(() => {
      this.#queued = false;
      this.#load();
    });
  }

  async #load() {
    this.#controller?.abort();
    const { signal } = (this.#controller = new AbortController());

    this.ariaBusy = 'true';
    this.dataset.state = 'loading';

    try {
      const album = await this.#getAlbum(signal);
      if (signal.aborted) return;
      this.#render(album);
      this.dataset.state = 'ready';
      this.dispatchEvent(new CustomEvent('flickr-album:load', { detail: album }));
    } catch (error) {
      if (signal.aborted) return;
      this.dataset.state = 'error';
      console.error('<flickr-album>', error);
      this.append(
        Object.assign(document.createElement('p'), {
          role: 'alert',
          textContent: `Couldn't display this album: ${error.message}`,
        }),
      );
      this.dispatchEvent(new CustomEvent('flickr-album:error', { detail: error }));
    } finally {
      if (!signal.aborted) this.ariaBusy = 'false';
    }
  }

  async #getAlbum(signal) {
    const src = this.getAttribute('src');
    if (src) {
      const response = await fetch(src, { signal });
      if (!response.ok) throw new Error(`Could not load ${src} (HTTP ${response.status})`);
      return response.json();
    }

    // The inline JSON is removed on render, so keep the parsed copy.
    if (!this.#inline) {
      const script = this.querySelector(':scope > script[type="application/json"]');
      if (script) this.#inline = JSON.parse(script.textContent);
    }
    if (!this.#inline) throw new Error('No album data. Use {% flickrAlbum album %} or set `src`.');
    return this.#inline;
  }

  #render(album) {
    const list = document.createElement('ul');
    list.className = 'flickr-album__list';
    list.setAttribute('role', 'list'); // keep list semantics in Safari despite list-style: none
    if (album.title) list.setAttribute('aria-label', `${album.title} photos`);

    for (const item of album.items) list.append(this.#renderItem(item));

    // Put the list where the inline JSON was (between the heading and the link),
    // or replace the list from an earlier render. With `src` there is no JSON, so append.
    const script = this.querySelector(':scope > script[type="application/json"]');
    const previous = this.#list?.isConnected ? this.#list : script;
    if (previous) previous.replaceWith(list);
    else this.append(list);
    this.#list = list;
    if (script?.isConnected) script.remove();
    this.querySelector(':scope > [role="alert"]')?.remove();
  }

  #renderItem(item) {
    const li = document.createElement('li');
    const figure = document.createElement('figure');

    const caption = document.createElement('figcaption');
    const link = document.createElement('a');
    link.href = item.pageUrl;
    link.textContent = item.title || 'View on Flickr';
    caption.append(link);

    const playable = item.type === 'video' && item.sources?.length;
    const media = item.type === 'video' && playable ? this.#renderVideo(item) : this.#renderImage(item);
    figure.append(media, caption);
    li.append(figure);
    return li;
  }

  #renderImage(item) {
    const img = new Image(item.width, item.height); // intrinsic ratio prevents layout shift
    img.loading = 'lazy'; // set before src so the browser honors it
    img.decoding = 'async';
    img.src = item.src;
    // Videos without a playable file show their poster; the caption links to Flickr.
    img.alt = item.type === 'video' ? `${item.title || 'Video'} (watch on Flickr)` : item.title;
    return img;
  }

  #renderVideo(item) {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.poster = item.src;
    video.width = item.width;
    video.height = item.height;
    video.setAttribute('aria-label', item.title || 'Video');
    video.append(
      ...item.sources.map(({ src, type }) => Object.assign(document.createElement('source'), { src, type })),
    );
    return video;
  }
}

if (!customElements.get('flickr-album')) customElements.define('flickr-album', FlickrAlbum);