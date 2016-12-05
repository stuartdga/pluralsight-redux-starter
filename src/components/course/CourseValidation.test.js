import expect from 'expect';
import {validateCourseForm} from './CourseValidation';

describe('Course Validation', () => {
  it('should return errors when all fields are empty', () => {
    const course = {title: '', authorId: '', category: '', length: ''};
    const errors = validateCourseForm(course);
    expect(Object.keys(errors).length).toEqual(4);
    expect(errors.title).toBe('Title must be at least 5 characters.');
    expect(errors.authorId).toBe('You must select an author.');
    expect(errors.category).toBe('Category must be at least 2 characters.');
    expect(errors.length).toBe('Title must be at least 4 characters.');
  });

  it('should return errors when title < 5', () => {
    const course = {title: 'asdf', authorId: 1, category: 'asdfasdf', length: 'asdfasdf'};
    let errors = validateCourseForm(course);
    expect(Object.keys(errors).length).toEqual(1);
    expect(errors.title).toBe('Title must be at least 5 characters.');
  });

  it('should return errors when authorID is empty', () => {
    const course = {title: 'asdfasdf', authorId: '', category: 'asdfasdf', length: 'asdfasdf'};
    let errors = validateCourseForm(course);
    expect(Object.keys(errors).length).toEqual(1);
    expect(errors.authorId).toBe('You must select an author.');
  });

  it('should return errors when category < 2', () => {
    const course = {title: 'asdfasdf', authorId: 1, category: '', length: 'asdfasdf'};
    let errors = validateCourseForm(course);
    expect(Object.keys(errors).length).toEqual(1);
    expect(errors.category).toBe('Category must be at least 2 characters.');
  });

  it('should return errors when category < 2', () => {
    const course = {title: 'asdfasdf', authorId: 1, category: 'asdfasdf', length: ''};
    let errors = validateCourseForm(course);
    expect(Object.keys(errors).length).toEqual(1);
    expect(errors.length).toBe('Title must be at least 4 characters.');
  });

});
