---
title: 'Tag Archive'
layout: 'layouts/landing.html'
eleventyExcludeFromCollections: true
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'work', 'featuredWork', 'people', 'rss']
permalink: '/tags/{{ tag | slugify }}/'
---