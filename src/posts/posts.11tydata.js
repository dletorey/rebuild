module.exports = {
  layout: "posts",
  tags: ["post"],
  eleventyComputed: {
    permalink: data => data.old ? "/blog/{{ page.fileSlug }}/index.html" : "/posts/{{ page.fileSlug }}/index.html",
  }
}