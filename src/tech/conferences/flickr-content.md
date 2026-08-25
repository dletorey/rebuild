---
title: "IndieWebCamp Dusseldorf 2026"
description: "Today I attended IndieWebCamp in Düsseldorf, before Beyond Tellerand conference."
tags: ["IndieWeb", "IndieWebCamp", "Dusseldorf", "Beyond Tellerand", "Coding"]
date: "2026-04-25"
updated: "2026-04-27"
eleventyExcludeFromCollections: true
permalink: testing-flickr/index.html
flickrData:
    album: https://flickr.com/photos/dletorey/albums/72177720333303287/
    aId: 72177720333303287
---

{% include "partials/flickr-content.html" %}

Frontmatter: {{flickrData.aId}}

{% set albumx = flickrData.aId %}
{{albumy}}
{% renderTemplate "webc", flickrData %}
    <flickr name="Dave" type="album" album="72177720333303287"></flickr>
    <flickr name="Dave" type="photo" album="72177720333303245"></flickr>
    <flickr name="Dave" type="video" album="72177720333303256"></flickr>
{% endrenderTemplate %}