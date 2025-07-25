import markdownit from "markdown-it"

const markdownIt = markdownit({
    html: true,
    breaks: true,
    linkify: true
})

// import plugins
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// import filters
import collectionFilters from "./src/eleventy/filters/collections.js";
import utilityFilters from "./src/eleventy/filters/utils.js";

// Import collections
import collections from "./src/eleventy/collections.js";

export default function (config) {
  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("posts", "posts.njk");
  config.addLayoutAlias("pages", "pages.njk");

  // plugins
  config.addPlugin(eleventyImageTransformPlugin, {
    outputDir: "./public/images",
    // output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
  });

  // redirects
  // config.addPassthroughCopy('src/_redirects');
  
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
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      output: "public",
      layouts: "_layouts"
    }
  };
};
