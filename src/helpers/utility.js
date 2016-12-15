export function sortList(unsortedList, propName, direction = 'asc') {
  if (typeof propName === "undefined" || propName.length == 0)
    return unsortedList;
  if (unsortedList.length === "undefined")
    return unsortedList;
  let sortedList = unsortedList.slice();
  if (sortedList.length > 1) {
    if (direction == 'asc')
      sortedList.sort(function (a, b) {
        return a[propName] > b[propName];
      });
    else
      sortedList.sort(function (a, b) {
        return a[propName] < b[propName];
      });
  }
  return sortedList;
}
