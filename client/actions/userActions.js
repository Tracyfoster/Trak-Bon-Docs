import axios from 'axios';
import { eventAction, setAuthorizationToken } from '../utils/Utils';
import * as types from './types';

export const registerUser = user => (dispatch) => {
  dispatch(eventAction(types.USER_REGISTRATION_REQUEST));
  return axios.post('/api/users', user)
    .then((res) => {
      const token = res.data.token;
      dispatch(eventAction(types.USER_LOGIN_SUCCESS, res.data.newUser));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(eventAction(types.SET_CURRENT_USER, res.data.newUser));
    })
    .catch((error) => {
      dispatch(eventAction(types.USER_REGISTRATION_FAIL));
    });
};

export const userLogin = user => (dispatch) => {
  dispatch(eventAction(types.USER_LOGIN_REQUEST));
  return axios.post('/api/users/login', user)
    .then((res) => {
      const token = res.data.token;
      dispatch(eventAction(types.USER_LOGIN_SUCCESS));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(eventAction(types.SET_CURRENT_USER, res.data.user));
    })
    .catch((error) => {
      dispatch(eventAction(types.USER_LOGIN_FAIL));
    });
};

export const logoutUser = () => dispatch =>
  axios.post('/api/users/logout')
    .then((res) => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(eventAction(types.SET_CURRENT_USER, {}));
    });
