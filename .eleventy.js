module.exports = function (config) {
  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("posts", "posts.njk");
  config.addLayoutAlias("pages", "pages.njk");

  // import filters
  const collectionFilters = require("./src/eleventy/filters/collections.js")
  // Import collections
  const collections = require("./src/eleventy/collections.js")
  // filters
  Object.keys(collectionFilters).forEach((filterName) => {
    config.addFilter(filterName, collectionFilters[filterName])
  })
  // Collections
  Object.keys(collections).forEach((collectionName) => {
    config.addCollection(collectionName, collections[collectionName])
  })
  // footer links collection
  // config.addCollection("footlinks", function(collectionApi) {
  //   return collectionApi.getFilteredByTag("link").sort(function(a, b) {
  //     return a.data.order - b.data.order; // sort by order - ascending;
  //   });
  // });
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
