import axios from 'axios';
import * as types from './types';
import { eventAction } from '../utils/Utils';

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then((res) => {
      const users = {};
      const payload = {};
      users.data = res.data;
      users.adminCount = res.data.filter(user => user.roleId === 1);
      users.reviewersCount = res.data.filter(user => user.roleId === 2);
      users.writersCount = res.data.filter(user => user.roleId === 3);
      payload.users = users;
      return dispatch(eventAction(types.SET_USERS, payload));
    });

export const fetchUser = id => dispatch =>
  axios.get(`/api/users/${id}`)
    .then(res => dispatch(eventAction(types.USER_FETCHED, res.data)));

export const updateUser = user => dispatch =>
  axios.put(`/api/users/${user.id}`, user)
    .then(res => dispatch(eventAction(types.USER_UPDATED, res.data)));

export const deleteUser = id => dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(res => dispatch(eventAction(types.USER_DELETED, res.data)));

export const fetchUserDocuments = id => dispatch =>
    axios.get(`/api/users/${id}/documents`)
      .then((res) => {
        const userDocuments = {};
        const payload = {};
        userDocuments.data = res.data.doc;
        userDocuments.public = (res.data.doc
          .filter(document => document.access === 'public'));
        userDocuments.private = (res.data.doc
          .filter(document => document.access === 'private'));
        userDocuments.role = (res.data.doc
          .filter(document => document.access === 'role'));
        payload.userDocuments = userDocuments;
        return dispatch(eventAction(types.SET_USER_DOCUMENTS, payload));
      });