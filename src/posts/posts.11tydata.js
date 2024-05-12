module.exports = {
  layout: "posts",
  contentType: "post",
  tags: ["post"],
  eleventyComputed: {
    permalink: data => data.old ? "/blog/{{ page.fileSlug }}/index.html" : "/posts/{{ page.fileSlug }}/index.html",
  }
}