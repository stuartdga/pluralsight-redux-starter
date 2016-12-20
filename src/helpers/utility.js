import toastr from 'toastr';

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

export function showLeaveConfirmation(nextLocationPath) {
  const html = "<br /><br /><button type='button' class='btn clear'>Yes</button>";
  toastr.warning(html,'Leave without saving?',
    {
      allowHtml: true,
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: 0,
      extendedTimeOut: 0,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: true,
      onclick: function() {
        window.location = window.location.origin + nextLocationPath;
      }
    });
}
