---
title: 'letorey.co.uk'
subTitle: 'Latest posts'
description: 'Home page of Letorey.co.uk'
layout: 'layouts/landing.html'
eleventyExcludeFromCollections: true
pagination:
  data: collections.allPosts
  size: 12
permalink: '{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: 'posts-list'
---
Dave's Home page
