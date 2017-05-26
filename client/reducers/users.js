import * as types from '../actions/types';
import InitialState from './InitialState';


export default (state = InitialState.users, action) => {
  switch (action.type) {
  case types.USER_REGISTRATION_REQUEST:
  case types.USER_LOGIN_REQUEST:
    return Object.assign({}, state, { loading: true });
  case types.USER_REGISTRATION_SUCCESS:
  case types.USER_REGISTRATION_FAIL:
  case types.NEW_USER:
  case types.USER_LOGIN_SUCCESS:
  case types.USER_LOGIN_FAIL:
    return Object.assign({}, state, { loading: false });
  default: return state;
  }
};
