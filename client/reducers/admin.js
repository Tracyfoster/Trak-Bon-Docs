import * as types from '../actions/types';

const initialState = {
  users: {},
  userDocuments: {},
}

export default function users(state = initialState, action = {}) {
  switch (action.type) {
  case types.USER_FETCHED:
    return [
      ...state.filter(user => user.id !== action.user.id),
      Object.assign({}, action.payload),
    ];
  case types.USER_UPDATED:
    return [
      ...state.filter(user => user.id !== action.user.id),
      Object.assign({}, action.payload),
    ];
  case types.USER_DELETED:
    return state.filter(item => item.id !== action.userId);
  case types.SET_USERS:
    return Object.assign({}, state, {
      users: action.payload
    });
  case types.SET_USER_DOCUMENTS:
    return Object.assign({}, state, {
      userDocuments: action.payload
    });
  default: return state;
  }
}
