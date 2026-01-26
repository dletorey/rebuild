---
title: "Books"
description: "List of books that I have read"
pagination:
  data: collections.books
  size: 12
  reverse: false
permalink: "books{% if pagination.pageNumber > 0%}/{{ pagination.pageNumber + 1 }}{% endif %}/index.html"
---
{{ description }}
{% include 'paginated.njk' %}
