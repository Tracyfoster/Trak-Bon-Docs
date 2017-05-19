import * as types from '../actions/types';

export default function documents(state = [], action = {}) {
  switch (action.type) {
  case types.ADD_DOCUMENT:
    return [
      ...state,
      Object.assign({}, action.payload),
    ];
  case types.DOCUMENT_FETCHED:
    return [
      ...state.filter(document => document.id !== action.payload.id),
      Object.assign({}, action.payload),
    ];
  case types.DOCUMENT_UPDATED:
    return [
      ...state.filter(document => document.id !== action.payload.id),
      Object.assign({}, action.payload),
    ];
  case types.DOCUMENT_DELETED:
    return [
      ...state.filter(document => document.id !== action.payload.id),
    ];
  case types.SET_DOCUMENTS:
    return action.payload;
  case types.SET_USER_DOCUMENTS:
    return action.payload;

  default: return state;
  }
}
