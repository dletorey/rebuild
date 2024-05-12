---
title: "What's going on in the (HTML) head"
description: "The <code>&lt;head&gt;</code> of an HTML file describes how the page works, this explains what goes inside."
tags: HTML, websites, head, favicon, CSS, social media
---

The `<head>` HTML element helps describe to the browser what is going on in a web page. Here I describe what those things are, what they do, and why they are important.

## The essentials

The following tags must be in the `<head>` and in the correct order.

### character set

The absolute first thing in the page tells the browser what character set to use. This has to go **first** as the browser needs to know what to use for every proceeding element.

```html
<meta charset="utf-8" />
```

### title

The title, or name, of the page is used for:

- the name in the browser tab
- the default name when bookmarking a page
- the name of a result in search results, for example:
  - [google](https://www.google.com/search?q=What's+going+on+in+the+HTML+head)
  - [bing](https://www.bing.com/search?q=What's+going+on+in+the+HTML+head)
  - [duck duck go](https://duckduckgo.com/?q=What's+going+on+in+the+HTML+head)

```html
<title>What's going on in the (HTML) head</title>
```

### viewport

This tells the browser how wide to set the content and makes the page responsive. There are two other attributes that are also essential and without you may fail accessibility checks, they are `initial-scale` and `user-scalable`.

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, user-scalable=1"
/>
```

## Optional but recommended

The next element are not essential but really should be included to aid with search and understanding.

### author

This `<meta>` element is used to help with discoverability and says who wrote the page/content.

```html
<meta name="author" content="Dave Letorey" />
```

### description

This `<meta>` element is used to help with discoverability and understandability. It is often displayed in listings, such as search results to give more context about the content.

```html
<meta
  name="description"
  content="The description of the page can improve SEO and understanding of what the page is about"
/>
```

## Optional

### robots

In order for your site to be indexed by search engines and appear in the search results you need to let them know which pages to be included. This is usually done with a `robots.txt` file. You can also override this file with a `robots` meta tag, which can exclude individual pages.

```html
<meta name="robots" content="noindex, nofollow" />
```

- `noindex` - do not index this page
- `nofollow` - do not follow any links on this page and index them

### theme-color

This meta tag allows you to set a theme colour for your site this may effect the chrome of the browser and other elements, but generally this is added via [`manifest.json`](https://developer.mozilla.org/en-US/docs/Web/Manifest).

```html
<meta name="theme-color" content="#ff0000" />
```

## Social media metadata

Metadata can be added to your page so that when a link is shared on social platforms the link would show more details about the page. All platforms, except Twitter, use [Open Graph](https://ogp.me/) metadata.

There are many social media fields the most important are:

- title - The title of the post being shared
- type - while there are many [types](https://ogp.me/#types), this i most likely set to `website`
- url - the canonical url of the content being shared
- image - this is the image shown in the social post
- description - a short description about the content being shared

### Open Graph

```html
<meta property="og:title" content="Title of post" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://letorey.co.uk/path-to-post" />
<meta property="og:image" content="https://letorey.co.uk/images/image-of-post.png" />
<meta property="og:description" content="Brief description of the content" />
```

### Twitter (I refuse to call it X)

Twitter has it's own rules that differ from every other social platform. The main being that is has a `twitter:card` property, which has a number of setting to do with the content need to be output:

- `summary` - added a card with a square image
- `summary_large_image` - adds a large rectangular image
- `app` - for linking to an App
- `player` - for linking to rich media, such as video, audio, etc

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Title of post" />
<meta name="twitter:description" content="Description of your content here" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:image" content="https://letorey.co.uk/images/image-of-post.png" />
<meta name="twitter:creator" content="@yourusername" /><!-- optional if sames as twitter:site -->
```

## `<link>` elements

The [link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) is used to load in external resources that are not part of the content, such as icons and stylesheets.

### favicon

This is a tiny little image that appears in the browser tab, it is a representation of you website/company usually, but can also be dynamic.

```html
<link rel="icon" type="image/svg+xml" href="images/favicon.ico" />
```

### Other Icons

Other icons can be loaded into the head using the `<link>` element these are used to add icons to devices such as phones. They can also be added in the [`mainfest.json` file](#manifest-file).

In this example different icons are loaded for different resolution devices.

```html
<link rel="apple-touch-icon" sizes="144x144" href="images/icon144.png" />
<link rel="apple-touch-icon" sizes="114x114" href="images/icon114.png" />
<link rel="apple-touch-icon" sizes="72x72" href="images/icon72.png" />
<link rel="apple-touch-icon" href="images/icon57.png" />
<link rel="icon" href="images/icon32.png" />
```

### manifest file

As previously mentioned the `manifest.json` file is used to load in the settings for the website or web app, such as:

- Name
- Colours
- Icons
- Description
- Start URL
- service worker location

```html
<link rel="manifest" href="manifest.json" />
```

### CSS (Cascading Style Sheets)

CSS is used to change the look and layout of a website and this can be loaded in as a resource alternative the styles can be written [inline in the head](#style-elements).

```html
<link rel="stylesheet" href="styles.css" />
```

## `<style>` elements

The CSS can also be written inline in the head, this has the advantage that a separate request does not need to happen to load the styles, but it does need to be added to every page. This is often added for essential styles and means the styles are added strainght away rather than waiting for the style to be downloaded (fetched), although once fetched the styles will be stored in the browser (cache).

## `<script>` elements

The `<script>` element can be used in two ways, to inline some JavaScript or to load a JavaScript file.

JavaScript adds interactivity to a website, for example making things happen when a user clicks on things.

### Inline JavaScript

Inline JavaScript allows you to have things happen immediately instead of waiting for a script to load. In this example a class is removed from the **documentElement** (`<html>` element on a website), this i used to style things differently for browsers that have JavaScript enable.

```html
<script>
  document.documentElement.classList.remove("no-js");
</script>
```

### Loading JavaScript

Alternatively JavaScript can be loaded as a resource. The `<head>` is not the only location to load a JavaScript file this can also be done at the very bottom of the HTML file just before the closing `<body>` element. This is done to make sure that the parsing of the JavaScript does not stall the painting of the rest of the page.

```html
<script src="javascript.js"></script>
```

Alternatively a `defer` attribute can be added to the `<script>` element, this will make sure that the rest of the page is loaded/painted before the JavaScript is parsed and has the same effect as adding  before the closing `<body>` element.

```html
<script defer src="javascript.js"></script>
```
