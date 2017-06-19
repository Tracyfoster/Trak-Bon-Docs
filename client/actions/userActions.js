import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { eventAction, setAuthorizationToken, isAdmin } from '../utils/Utils';
import * as types from './types';


export const registerUser = user =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/users', user)
      .then((res) => {
        const token = res.data.token;
        const userDetails = res.data.data;
        dispatch(eventAction(types.SET_CURRENT_USER, userDetails));
        isAdmin(userDetails.roleId);
        setAuthorizationToken(token);
        resolve(token)
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
    });

export const createUser = user => dispatch =>
  axios.post('/api/users', user)
    .then(() => {
      dispatch(eventAction(types.NEW_USER));
    })
    .catch((error) => {
      throw error;
    });

export const userLogin = user =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/users/login', user)
      .then((res) => {
        const token = res.data.token;
        const userDetails = res.data.data;
        dispatch(eventAction(types.SET_CURRENT_USER, userDetails));
        setAuthorizationToken(token);
        isAdmin(userDetails.roleId);
        resolve(token);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

export const logoutUser = () =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/users/logout')
      .then(() => {
        setAuthorizationToken(false);
        dispatch(eventAction(types.SET_CURRENT_USER, {}))
        resolve(true);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
    });
