import * as types from '../actions/types';

export default function folders(state = [], action = {}) {
  switch (action.type) {
  case types.ADD_FOLDER:
    return [
      ...state,
      Object.assign({}, action.payload),
    ];
  case types.FOLDER_FETCHED:
    return [
      ...state.filter(folder => folder.id !== action.payload.id),
      Object.assign({}, action.payload),
    ];
  case types.FOLDER_UPDATED:
    return [
      ...state.filter(folder => folder.id !== action.payload.id),
      Object.assign({}, action.payload),
    ];
  case types.FOLDER_DELETED:
    return [
      ...state.filter(folder => folder.id !== action.payload.id),
    ];
  case types.SET_FOLDERS:
    return action.payload;

  default: return state;
  }
}
