import * as types from '../actions/types';
import InitialState from './InitialState';

export default (state = InitialState.admin, action = {}) => {
  switch (action.type) {
  case types.FETCH_USERS_SUCCESS:
    return Object.assign({}, state, {
      users: action.payload.rows,
      totalUsers: action.payload.count
    });
  case types.USER_FETCHED:
    return Object.assign({}, state, {
      users: [...state.users
      .filter(user => user.id !== action.payload.id), action.payload],
      totalUsers: state.totalUsers + 1
    });
  case types.USER_UPDATED:
    return Object.assign({}, state, {
      users: [...state.users
      .filter(user => user.id !== action.payload.id), action.payload]
    });
  case types.USER_DELETED:
    return Object.assign({}, state, {
      users: state.users.filter(user => user.id !== action.payload.id),
      totalUsers: state.totalUsers - 1
    });
  default: return state;
  }
};
