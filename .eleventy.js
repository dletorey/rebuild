module.exports = function (eleventyConfig) {
  const site = require("./src/data/site.json")
  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
    },
  };
};