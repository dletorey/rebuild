export default {
  limit: (array, limit) => {
      return array.slice(0, limit)
  },
  arrayKeyEquals: (array, key, value) => {
      return array.filter((item) => {
          const keys = key.split(".")
          const reducedKey = keys.reduce((object, key) => {
              return object[key]
          }, item)

          return reducedKey === value ? item : false
      })
  },
  keyValue: (object, key) => {
      return object[key]
  },
  keySort: (array, key) => {
      return array.sort((a, b) => {
          return a[key].localeCompare(b[key])
      })
  },
  toArray: (value) => {
      if (Array.isArray(value)) {
          return value
      }
      return [value]
  },
}
