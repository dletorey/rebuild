module.exports = function (config) {
  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("posts", "posts.njk");
  config.addLayoutAlias("pages", "pages.njk");
  // collections
  // footer links collection
  config.addCollection("footlinks", function(collectionApi) {
    return collectionApi.getFilteredByTag("footlink").sort(function(a, b) {
      return a.data.order - b.data.order; // sort by order - ascending;
    });
  });
  config.addPassthroughCopy("images")
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public",
      layouts: "_layouts"
    }
  };
};
