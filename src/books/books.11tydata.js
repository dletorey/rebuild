export default {
  layout: "books",
  contentType: "book",
  tags: ["book", "post"],
  eleventyComputed: {
    permalink: "/books/{{ page.fileSlug }}/index.html",
  }
}