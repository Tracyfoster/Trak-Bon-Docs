import axios from 'axios';
import * as types from './types';

const eventAction = (type, payload) => ({
  type,
  payload
});

export function createFolder(data) {
  return (dispatch) => {
    return axios.post('/api/folders', data)
       .then((response) => {
         dispatch(eventAction(types.ADD_FOLDER, response.data));
       })
      .catch((error) => {
        throw (error);
      });
  };
}

export function fetchFolders() {
  return (dispatch) => {
    return axios.get('/api/folders')
      .then((res) => {
        dispatch(eventAction(types.SET_FOLDERS, res.data.folder));
  });
  };
}

export function fetchFolder(id) {
  return (dispatch) => {
    return axios.get(`/api/folders/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.FOLDER_FETCHED, data.folder)));
  };
}

export function updateFolder(data) {
  return (dispatch) => {
    return axios.put(`/api/folders/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.FOLDER_UPDATED, res.data.folder));
      });
  };
}
export function deleteFolder(id) {
  return (dispatch) => {
    return axios.delete(`/api/folders/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.FOLDER_DELETED, { id })));
  };
}

