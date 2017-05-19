import * as types from '../actions/types';

const initialState = {
  loading: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.USER_REGISTRATION_REQUEST:
  case types.USER_LOGIN_REQUEST:
    return Object.assign({}, state, { loading: true });
  case types.USER_REGISTRATION_SUCCESS:
  case types.USER_REGISTRATION_FAIL:
  case types.USER_LOGIN_SUCCESS:
  case types.USER_LOGIN_FAIL:
    return Object.assign({}, state, { loading: false, user: {} });
  default: return state;
  }
};
