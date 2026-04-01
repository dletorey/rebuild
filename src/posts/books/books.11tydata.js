export default {
  layout: "books",
  contentType: "book",
  tags: ["book"],
  eleventyComputed: {
    permalink: "/books/{{ page.fileSlug }}/index.html",
  }
}