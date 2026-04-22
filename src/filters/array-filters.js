export const filterByKey = (myArray, myKey, myFilter) => {
  return myArray.filter((link) => link[myKey] == myFilter)
};