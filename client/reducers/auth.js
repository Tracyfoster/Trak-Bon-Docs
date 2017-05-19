import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return Object.assign({}, state, {
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    });
  default: return state;
  }
};