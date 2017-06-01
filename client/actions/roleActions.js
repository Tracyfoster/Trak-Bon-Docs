import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export function createRole(data) {
  return (dispatch) => {
    return axios.post('/api/roles', data)
       .then((response) => {
         dispatch(eventAction(types.ADD_ROLE, response.data.role));
       })
      .catch((error) => {
        throw (error);
      });
  };
}

export function fetchRoles() {
  return (dispatch) => {
    return axios.get('/api/roles')
      .then((res) => {
        dispatch(eventAction(types.SET_ROLES, res.data.role));
  });
  };
}

export function fetchRole(id) {
  return (dispatch) => {
    return axios.get(`/api/roles/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.ROLE_FETCHED, data.role)));
  };
}

export function updateRole(data) {
  return (dispatch) => {
    return axios.put(`/api/roles/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.ROLE_UPDATED, res.data.role));
      });
  };
}
export function deleteRole(id) {
  return (dispatch) => {
    return axios.delete(`/api/roles/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(types.ROLE_DELETED, { id })));
  };
}

