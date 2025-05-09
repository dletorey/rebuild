import markdownit from "markdown-it"

const markdownIt = markdownit({
    html: true,
    breaks: true,
    linkify: true
})

// import 11ty-img
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// import filters
import collectionFilters from "./src/eleventy/filters/collections.js";
import utilityFilters from "./src/eleventy/filters/utils.js";

// Import collections
import collections from "./src/eleventy/collections.js";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setOutputDirectory("public");
  // eleventyConfig.setQuietMode(true);
  
  // images
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("posts", "posts.njk");
  eleventyConfig.addLayoutAlias("pages", "pages.njk");

  // redirects
  // eleventyConfig.addPassthroughCopy('src/_redirects');
  
  // filters
  Object.keys(collectionFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, collectionFilters[filterName]);
  });
  
  // Collections
  Object.keys(collections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });
  Object.keys(utilityFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, utilityFilters[filterName]);
  });
  eleventyConfig.addPassthroughCopy("images");
  return {
    passthroughFileCopy: true,
  };
  
};

export const config = {
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
