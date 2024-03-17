const collectionFilters = require("./filters/collections.js")

module.exports = {
  footerLinks: collection => {
      return collection
          .getFilteredByTag("link")
          .filter(collectionFilters.isPublished)
          .filter(collectionFilters.inFooter)
  },
  pages: collection => {
      return collection
          .getFilteredByTag("page")
          .filter(collectionFilters.isPublished)
  },
  events: collection => {
      return collection
          .getFilteredByTag("event")
          .filter(collectionFilters.isPublished)
          .sort(collectionFilters.dateFilter)
          .reverse()
  },
  upcomingEvents: collection => {
      return collection
          .getFilteredByTag("event")
          .filter(collectionFilters.isPublished)
          .filter(event => dateFilters.epoch(event.date) > global.now)
          .sort(collectionFilters.dateFilter)
          .reverse()
  },
  pastEvents: collection => {
      return collection
          .getFilteredByTag("event")
          .filter(collectionFilters.isPublished)
          .filter(event => dateFilters.epoch(event.date) <= global.now)
          .sort(collectionFilters.dateFilter)
          .reverse()
  },
}