import * as types from '../actions/types';
import InitialState from './InitialState';

export default function documents(state = InitialState.documents, action = {}) {
  switch (action.type) {
  case types.ADD_DOCUMENT:
    return Object.assign({}, state, {
      userDocuments: {
        data: [ ...state, action.payload.document],
        totalItems: state.userDocuments.totalItems + 1
      }
    });
  case types.SET_DOCUMENTS:
    return Object.assign({}, state, {
      data: action.payload.rows,
      totalItems: action.payload.count
    });
  case types.SET_USER_DOCUMENTS:
    return Object.assign({}, state, {
      userDocuments: {
        data: action.payload.user.rows[0].userDocuments,
        totalItems: action.payload.user.count
      }
    });
  case types.DOCUMENT_FETCHED:
    return Object.assign({}, state, {
      userDocuments: {
        data: [...state.userDocuments.data
          .filter(user => user.id !== action.payload.id), action.payload]
      }
    });
  case types.DOCUMENT_UPDATED:
    return Object.assign({}, state, {
      userDocuments: {
        data: [...state.userDocuments.data
          .filter(user => user.id !== action.payload.id), action.payload]
      }
    });
  case types.DOCUMENT_DELETED:
    return Object.assign({}, state, {
      userDocuments: {
        data: state.userDocuments.data.filter(user => user.id !== action.payload.id),
        totalItems: state.userDocuments.totalItems - 1
      }
    });

  default: return state;
  }
}
