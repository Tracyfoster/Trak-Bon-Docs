import axios from 'axios';

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const eventAction = (type, payload) => ({
  type,
  payload
});

export const isAdmin = (roleId) => {
  if (roleId === 1) {
    return true;
  }
  return false;
};
