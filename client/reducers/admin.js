import * as types from '../actions/types';


export default function users(state = [], action = {}) {
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
    return action.payload;
  default: return state;
  }
}
