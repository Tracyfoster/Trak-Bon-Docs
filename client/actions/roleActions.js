import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const createRole = data => dispatch =>
  axios.post('/api/roles', data)
       .then((response) => {
         dispatch(eventAction(types.ADD_ROLE, response.data.role));
       })
      .catch((error) => { throw error; });

export const fetchRoles = () => dispatch =>
  axios.get('/api/roles')
      .then((res) => {
        dispatch(eventAction(types.SET_ROLES, res.data.role))
      .catch((error) => { throw error; });
      });

export const fetchRole = id => dispatch =>
  axios.get(`/api/roles/${id}`)
      .then(res => dispatch(eventAction(types.ROLE_FETCHED, res.data.role)))
      .catch((error) => { throw error; });

export const updateRole = data => dispatch =>
  axios.put(`/api/roles/${data.id}`, data)
      .then((res) => {
        dispatch(eventAction(types.ROLE_UPDATED, res.data.role));
      })
      .catch((error) => { throw error; });
export const deleteRole = id => dispatch =>
  axios.delete(`/api/roles/${id}`)
      .then(res => dispatch(eventAction(types.ROLE_DELETED, { id })))
      .catch((error) => { throw error; });
