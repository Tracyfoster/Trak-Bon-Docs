import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const saveDocument = data => (dispatch) =>
  axios.post('/api/documents', data)
    .then(res =>
      dispatch(eventAction(types.ADD_DOCUMENT, res.data)))
    .catch((error) => { throw error; });

export const fetchDocuments = (offset = 0) => (dispatch) =>
  axios.get(`/api/documents/?offset=${offset}`)
      .then(res => {
        dispatch(eventAction(types.SET_DOCUMENTS, res.data))
      })
      .catch((error) => { throw error; });

export const fetchDocument = id => dispatch =>
  axios.get(`/api/documents/${id}`)
      .then(res =>
        dispatch(eventAction(types.DOCUMENT_FETCHED, res.data.document)))
      .catch((error) => { throw error; });

export const updateDocument = data => dispatch =>
  axios.put(`/api/documents/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.DOCUMENT_UPDATED, res.data.updatedDoc));
      })
      .catch((error) => { throw error; });
export const deleteDocument = id => dispatch =>
  axios.delete(`/api/documents/${id}`)
      .then(() => dispatch(eventAction(types.DOCUMENT_DELETED, { id })))
      .catch((error) => { throw error; });

export const fetchUserDocuments = (id, offset = 0) => dispatch =>
    axios.get(`/api/users/${id}/documents/?offset=${offset}`)
      .then(res =>
        dispatch(eventAction(types.SET_USER_DOCUMENTS, res.data)))
      .catch(error => error.response.data.message );

export const searchDocuments = (searchTerm, offset) => dispatch =>
  axios.get(`/api/search/documents/?q=${searchTerm}&offset=${offset}`)
       .then((response) => {
         dispatch(eventAction(types.DOCUMENT_SEARCH_RESULTS, response.data));
       })
      .catch((error) => { throw error; });
