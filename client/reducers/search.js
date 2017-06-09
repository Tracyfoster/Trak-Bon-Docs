import * as types from '../actions/types';
import InitialState from './InitialState';

/**
 * search reducer
 * @param  {object} [state=InitialState.search ] [description]
 * @param  {object} action [description]
 * @return {object}  [description]
 */
export default function documents(state = InitialState.search, action = {}) {
  switch (action.type) {
  case types.DOCUMENT_SEARCH_RESULTS:
    return Object.assign({}, state, {
      documents: {
        data: action.payload.documents.rows,
        totalItems: action.payload.documents.count
      }
    });
  case types.USER_SEARCH_RESULTS:
    return Object.assign({}, state, {
      users: {
        data: action.payload.rows,
        totalItems: action.payload.count
      }
    });
  default: return state;
  }
}
