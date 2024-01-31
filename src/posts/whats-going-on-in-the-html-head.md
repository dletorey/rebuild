---
title: "What's going on in the (HTML) head"
description: ""
tags: html, websites, head
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

## Optional but recommended

The next element are not essential but really should be included to aid with search and understanding.

### author

This `<meta>` element is used to help with discoverability and says who wrote the page/content.

### description

This `<meta>` element is used to help with discoverability and understandability. It is often displayed in listings, such as search results to give more context about the content.
