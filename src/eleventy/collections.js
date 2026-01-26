import collectionFilters from "./filters/collections.js";
const { isPublished, sortByDate, sortByDateRev, social, inFooter, notInFooter, reverseOrder, dateFilter, changes, notChanges } = collectionFilters

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
  },
  posts: collection => {
    return collection
      .getFilteredByTag("post")
      .filter(collectionFilters.isPublished);
  },
  books: collection => {
    return collection
      .getFilteredByTag("book")
      .filter(collectionFilters.isPublished);
  },
  seasia: collection => {
    return collection
      .getFilteredByTag("South East Asia")
      .filter(collectionFilters.isPublished);
  }
};
