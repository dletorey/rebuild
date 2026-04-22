---
title: 'Travel'
layout: 'layouts/landing.html'
eleventyExcludeFromCollections: true
pagination:
  data: collections.travel
  size: 12
permalink: 'travel{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer travel posts'
paginationNextText: 'Older travel posts'
paginationAnchor: 'travel-list'
---
The latest articles from around the studio, demonstrating our design
thinking, strategy and expertise.