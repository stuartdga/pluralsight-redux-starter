import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}

export function deleteAuthorSuccess(authors) {
  return {type: types.DELETE_AUTHOR_SUCCESS, authors};
}

export function sortAuthorsSuccess(authors) {
  return {type: types.SORT_AUTHORS_SUCCESS, authors};
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then( authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function deleteAuthor(authorId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorApi.deleteAuthor(authorId).then( authors => {
      dispatch(deleteAuthorSuccess(authors));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function sortAuthors(authors, propName, direction) {
  return function (dispatch, getState) {
    return authorApi.sortAuthors(authors, propName, direction).then(authors => {
      dispatch(sortAuthorsSuccess(authors));
    });
  };
}

