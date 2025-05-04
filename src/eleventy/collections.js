import collectionFilters from "./filters/collections.js";
const { isPublished, sortByDate, sortByDateRev, social, inFooter, notInFooter, reverseOrder, dateFilter } = collectionFilters

export default {
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
  },
  changes: collection => {
    return collection
      .getFilteredByTag("change")
      // .filter(collectionFilters.dateFilter);
  }
};
