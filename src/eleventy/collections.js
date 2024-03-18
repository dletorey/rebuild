const collectionFilters = require("./filters/collections.js");

module.exports = {
  footerLinks: collection => {
    return collection
      .getFilteredByTag("daveLink")
      .filter(collectionFilters.isPublished)
      .filter(collectionFilters.inFooter);
  },
  social: collection => {
    return collection
      .getFilteredByTag("daveLink")
      .filter(collectionFilters.isPublished)
      .filter(collectionFilters.social);
  },
  daveLinks: collection => {
    return collection
      .getFilteredByTag("daveLink")
      .filter(collectionFilters.isPublished)
      .filter(collectionFilters.notInFooter);
  }
};
