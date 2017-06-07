import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/api/documents', data)
       .then((response) => {
         dispatch(eventAction(types.ADD_DOCUMENT, response.data));
       })
      .catch((error) => {
        throw (error);
      });
  };
}

export function fetchDocuments() {
  return (dispatch) => {
    return axios.get('/api/documents')
      .then(res => res.data)
      .then(documents => dispatch(eventAction(types.SET_DOCUMENTS, documents)));
  };
}

export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then(res => res.data)
      .then(data =>
        dispatch(eventAction(types.DOCUMENT_FETCHED, data.document)));
  };
}

export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/api/documents/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.DOCUMENT_UPDATED, res.data.updatedDoc));
      });
  };
}
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.DOCUMENT_DELETED, { id })));
  };
}

export const fetchUserDocuments = id => dispatch =>
    axios.get(`/api/users/${id}/documents`)
      .then(res => {
        console.log('res', res.data)
        dispatch(eventAction(types.SET_USER_DOCUMENTS, res.data))
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