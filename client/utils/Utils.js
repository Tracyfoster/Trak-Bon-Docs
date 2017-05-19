import axios from 'axios';

export default function setAuthorizationToken(token) {
  console.log('token', token);
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

const eventAction = (type, payload) => ({
  type,
  payload
});