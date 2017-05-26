import * as types from '../actions/types';
import InitialState from './InitialState';

/**
 * search reducer
 * @param  {object} [state=[] ] [description]
 * @param  {object} action                           [description]
 * @return {object}                                  [description]
 */
export default function documents(state = InitialState.search, action = {}) {
  switch (action.type) {
  case types.DOCUMENT_SEARCH_RESULTS:
    return Object.assign({}, state, {
      documents: action.payload
    });
  case types.USER_SEARCH_RESULTS:
    return Object.assign({}, state, {
      users: action.payload
    });
  default: return state;
  }
}
