import axios from 'axios';
import * as types from './types';

const eventAction = (type, payload) => ({
  type,
  payload
});

export function searchDocuments(searchTerm) {
  return (dispatch) => {
    return axios.get(
        `/api/search/documents/?q=${searchTerm}`)
       .then((response) => {
         dispatch(eventAction(types.DOCUMENT_SEARCH_RESULTS, response.data));
       })
      .catch((error) => {
        throw (error);
      });
  };
}

export function searchUsers(searchTerm) {
  return (dispatch) => {
    return axios.get(
        `/api/search/users/?q=${searchTerm}`)
      .then((response) => {
        dispatch(eventAction(types.USER_SEARCH_RESULTS, response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}


