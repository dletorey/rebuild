module.exports = function (config) {
  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("posts", "posts.njk");
  config.addLayoutAlias("pages", "pages.njk");

  // redirects
  // config.addPassthroughCopy('src/_redirects');
  // import filters
  const collectionFilters = require("./src/eleventy/filters/collections.js");
  const utilityFilters = require("./src/eleventy/filters/utils.js");
  // Import collections
  const collections = require("./src/eleventy/collections.js");
  // filters
  Object.keys(collectionFilters).forEach(filterName => {
    config.addFilter(filterName, collectionFilters[filterName]);
  });
  // Collections
  Object.keys(collections).forEach(collectionName => {
    config.addCollection(collectionName, collections[collectionName]);
  });
  Object.keys(utilityFilters).forEach(filterName => {
    config.addFilter(filterName, utilityFilters[filterName]);
  });
  config.addPassthroughCopy("images");
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public",
      layouts: "_layouts"
    }
  };
};
