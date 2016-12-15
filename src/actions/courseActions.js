import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(courses) {
  return {type: types.DELETE_COURSE_SUCCESS, courses};
}

export function sortCoursesSuccess(courses) {
  return {type: types.SORT_COURSES_SUCCESS, courses};
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then( courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function deleteCourse(courseId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(courseId).then( courses => {
      dispatch(deleteCourseSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function sortCourses(courses, propName, direction) {
  return function(dispatch, getState) {
    return courseApi.sortCourses(courses, propName, direction).then(courses => {
      dispatch(sortCoursesSuccess(courses));
    });
  };
}
