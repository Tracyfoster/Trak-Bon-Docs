import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export function searchDocuments(searchTerm) {
  return (dispatch) => {
    return axios.get(
        `/api/search/documents/?q=${searchTerm}`)
       .then(res => {
         dispatch(eventAction(types.DOCUMENT_SEARCH_RESULTS, res.data));
       })
      .catch(error => {throw error});
  };
}

export function searchUsers(searchTerm) {
  return (dispatch) => {
    return axios.get(
        `/api/search/users/?q=${searchTerm}`)
      .then(res => {
        dispatch(eventAction(types.USER_SEARCH_RESULTS, res.data));
      })
      .catch(error => {throw error});
  };
}


