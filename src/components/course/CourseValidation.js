export function validateCourseForm(course) {
  let errors = {};
  if (course.title.length < 5) {
    errors.title = 'Title must be at least 5 characters.';
  }

  if (course.authorId == '') {
    errors.authorId = 'You must select an author.';
  }

  if (course.category.length < 2) {
    errors.category = 'Category must be at least 2 characters.';
  }

  if (course.length.length < 4) {
    errors.length = 'Title must be at least 4 characters.';
  }
  return errors;
}
