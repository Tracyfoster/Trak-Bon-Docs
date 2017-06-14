import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { eventAction, setAuthorizationToken, isAdmin } from '../utils/Utils';
import * as types from './types';


export const registerUser = user => (dispatch) => {
  dispatch(eventAction(types.USER_REGISTRATION_REQUEST));
  return axios.post('/api/users', user)
    .then((res) => {
      const token = res.data.token;
      const userDetails = jwtDecode(token);
      dispatch(eventAction(types.USER_LOGIN_SUCCESS));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      isAdmin(res.data.user.roleId);
      dispatch(eventAction(types.SET_CURRENT_USER, userDetails));
    })
    .catch((error) => {
      dispatch(eventAction(types.USER_REGISTRATION_FAIL));
      throw (error);
    });
};

export const createUser = user => dispatch =>
  axios.post('/api/users', user)
    .then(() => {
      dispatch(eventAction(types.NEW_USER));
    })
    .catch((error) => { throw error; });

export const userLogin = user => (dispatch) => {
  dispatch(eventAction(types.USER_LOGIN_REQUEST));
  return axios.post('/api/users/login', user)
    .then((res) => {
      const token = res.data.token;
      const userDetails = jwtDecode(token);
      dispatch(eventAction(types.USER_LOGIN_SUCCESS));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      isAdmin(res.data.user.roleId);
      dispatch(eventAction(types.SET_CURRENT_USER, userDetails));
    })
    .catch((error) => {
      dispatch(eventAction(types.USER_LOGIN_FAIL));
      throw (error);
    });
};

export const logoutUser = () => dispatch =>
  axios.post('/api/users/logout')
    .then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(eventAction(types.SET_CURRENT_USER, {}))
    .catch((error) => { throw error; });
    });
