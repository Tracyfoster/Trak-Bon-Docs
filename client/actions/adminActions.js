import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(res =>
      dispatch(eventAction(types.FETCH_USERS_SUCCESS, res.data)))
    .catch((error) => { throw error; });

export const fetchUser = id => dispatch =>
  axios.get(`/api/users/${id}`)
    .then(res => dispatch(eventAction(types.USER_FETCHED, res.data)))
    .catch((error) => { throw error; });

export const updateUser = user => dispatch =>
  axios.put(`/api/users/${user.id}`, user)
    .then((res) => {
      dispatch(eventAction(types.USER_UPDATED, res.data.updatedUser));
    }).catch((error) => { throw error; });

export const deleteUser = id => dispatch =>
  axios.delete(`/api/users/${id}`)
    .then(res => dispatch(eventAction(types.USER_DELETED, { id })))
    .catch((error) => { throw error; });

export const searchUsers = searchTerm => dispatch =>
  axios.get(`/api/search/users/?q=${searchTerm}`)
    .then(res =>
      dispatch(eventAction(types.USER_SEARCH_RESULTS, res.data)))
    .catch((error) => { throw error; });
