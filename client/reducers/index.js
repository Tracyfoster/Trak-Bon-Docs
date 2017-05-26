import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin';
import documents from './documents';
import folders from './folders';
import users from './users';
import roles from './roles';
import search from './search';

export default combineReducers({
  auth,
  admin,
  documents,
  folders,
  users,
  roles,
  search
});
