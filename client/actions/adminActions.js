import axios from 'axios';
import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from './types';

const eventAction = (type, payload) => ({
  type,
  payload
});

export function fetchUsers() {
  return dispatch => axios.get('/api/users')
      .then(res => res.data)
      .then(data => dispatch(eventAction(SET_USERS, data)));
}

export function fetchUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
      .then(res => dispatch(eventAction(USER_FETCHED, res.data)));
}

export function updateUser(user) {
  return dispatch => axios.put(`/api/users/${user.id}`, user)
      .then(res => dispatch(eventAction(USER_UPDATED, res.data)));
}
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
      .then(res => res.data)
      .then(data => dispatch(eventAction(id)));
}