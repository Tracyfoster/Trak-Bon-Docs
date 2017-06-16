import * as types from '../actions/types';
import InitialState from './InitialState';

export default (state = InitialState.roles, action = {}) => {
  switch (action.type) {
  case types.ADD_ROLE:
    return [
      ...state,
      Object.assign({}, action.payload),
    ];
  case types.ROLE_FETCHED:
    return [
      ...state.filter(role => role.id !== action.payload.id),
      Object.assign({}, action.payload),
    ];
  case types.ROLE_UPDATED:
    return [
      ...state.filter(role => role.id !== action.payload.id), action.payload
    ];
  case types.ROLE_DELETED:
    return [
      ...state.filter(role => role.id !== action.payload.id),
    ];
  case types.SET_ROLES:
    return action.payload;

  default: return state;
  }
};
