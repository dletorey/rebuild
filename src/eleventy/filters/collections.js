export default {
  isPublished: (item) => {
    if ("data" in item && "published" in item.data && item.data.published === false) {
        return false
    }
    return true
  },
  social: (item) => {
    if ("data" in item && "category" in item.data && item.data.category !== "Social Media") {
        return false
    }
    return true
  },
  inFooter: (item) => {
    if ("data" in item && "footer" in item.data && item.data.footer === false) {
        return false
    }
    return true
  },
  notInFooter: (item) => {
    if ("data" in item && "footer" in item.data && item.data.footer === true) {
        return false
    }
    return true
  },
  order: (a, b) => a.data.order - b.data.order,
  reverseOrder: (a, b) => a.data.order - b.data.order,
  dateFilter: (a, b) => a.date - b.date,
}