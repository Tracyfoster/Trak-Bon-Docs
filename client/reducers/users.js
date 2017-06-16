import * as types from '../actions/types';
import InitialState from './InitialState';


export default (state = InitialState.users, action) => {
  switch (action.type) {
  case types.NEW_USER:
    return Object.assign({}, state, { created: true });
  default: return state;
  }
};
