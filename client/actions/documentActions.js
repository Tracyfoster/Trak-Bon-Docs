import axios from 'axios';
import * as types from './types';

const eventAction = (type, payload) => ({
  type,
  payload
});

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
        eventAction(types.DOCUMENT_UPDATED);
      });
  };
}
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.DOCUMENT_DELETED, id)));
  };
}

export const fetchUserDocuments = id => dispatch =>
    axios.get(`/api/users/${id}/documents`)
      .then(res =>
        dispatch(eventAction(types.SET_USER_DOCUMENTS, res.data)));