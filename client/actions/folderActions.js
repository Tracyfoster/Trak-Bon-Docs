import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const createFolder = data => dispatch =>
  axios.post('/api/folders', data)
       .then((response) => {
         dispatch(eventAction(types.ADD_FOLDER, response.data));
       })
      .catch((error) => { throw error; });

export const fetchFolders = () => dispatch =>
  axios.get('/api/folders')
      .then((res) => {
        dispatch(eventAction(types.SET_FOLDERS, res.data.folder))
      .catch((error) => { throw error; });
      });

export const fetchFolder = id => dispatch =>
  axios.get(`/api/folders/${id}`)
      .then(res =>
        dispatch(eventAction(types.FOLDER_FETCHED, res.data.folder)))
      .catch((error) => { throw error; });

export const updateFolder = data => dispatch =>
  axios.put(`/api/folders/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.FOLDER_UPDATED, res.data.folder));
      })
      .catch((error) => { throw error; });
export const deleteFolder = id => dispatch =>
  axios.delete(`/api/folders/${id}`)
      .then(res => dispatch(eventAction(types.FOLDER_DELETED, { id })))
      .catch((error) => { throw error; });
