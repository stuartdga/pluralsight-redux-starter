##Demo application for Pluralsight course [Building Applications in React and Redux in ES6](https://github.com/coryhouse/pluralsight-redux-starter) with additional features:

###Added features:
1. Author administration
  * Basically a repeat of course administration
2. Delete course
  * This demonstrates the full redux flow
3. Unsaved changes message (2 cool features)
  * Uses react-router withRouter to wrap the react component and then captures the action in setRouteLeaveHook
  * Bypasses the default alert used by react-router with a better looking toastr warning box
4. Client-side validation
  * Demonstrates how to isolate business validation logic
5. Handle 404’s
  * Simple approach using react-router to a NotFoundPage component
6. Show # courses in Header
7. Sorting for course and author tables
  * Created a SortableHeader component that can be used to sort all columns, automatically switching from ascending to descending
  * Added a utility method to perform the list sorting
8. Show author name when adding course
9. Hide empty course list
  * Shows how to uses styles in a react component to control component rendering
10. Delete author only they have no course
  * Uses the course list from props to prevent deleting when a course is present

###Future items to be added:
1. Pagination
2. Revert abandoned changes
