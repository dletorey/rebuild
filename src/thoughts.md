---
title: 'Thoughts'
layout: 'layouts/landing.html'
eleventyExcludeFromCollections: true
pagination:
  data: collections.thoughts
  size: 12
permalink: 'thoughts{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer thoughts posts'
paginationNextText: 'Older thoughts posts'
paginationAnchor: 'thoughts-list'
---
The latest articles from around the studio, demonstrating our design
thinking, strategy and expertise.