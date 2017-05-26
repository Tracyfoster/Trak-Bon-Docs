import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(res =>
      dispatch(eventAction(types.FETCH_USERS_SUCCESS, res.data)));

export const fetchUser = id => dispatch =>
  axios.get(`/api/users/${id}`)
    .then(res => dispatch(eventAction(types.USER_FETCHED, res.data)));

export const updateUser = user => dispatch =>
  axios.put(`/api/users/${user.id}`, user)
    .then((res) => {
      dispatch(eventAction(types.USER_UPDATED, res.data.updatedUser));
    });

export const deleteUser = id => dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(res => dispatch(eventAction(types.USER_DELETED, { id })));
