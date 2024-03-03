module.exports = function (config) {
  // Layouts
  config.addLayoutAlias("base", "base.njk")
  config.addLayoutAlias("posts", "posts.njk")
  config.addLayoutAlias("pages", "pages.njk")
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public",
      layouts: "_layouts",
    },
  };
};