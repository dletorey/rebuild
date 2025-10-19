---
title: "Posts"
pagination:
  data: collections.posts
  size: 12
  reverse: true
permalink: "posts/{{ pagination.pageNumber + 1 }}/index.html"
---
All the posts I have written
{% include 'paginated.njk' %}
