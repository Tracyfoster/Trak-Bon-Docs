import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  fetchUsers,
  fetchUser,
  updateUser,
  deleteUser,
  searchUsers
} from '../../actions/adminActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('Admin actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('fetchUsers action', () => {
    it('should dispatch FETCH_USERS_SUCCESS', () => {
      moxios.stubRequest('/api/users', {
        status: 200,
        response: {
          data: { 0: { name: 'john' }}
        }
      });

      const expectedActions = [{
        payload: {
          data: {
            0: { name: 'john' }
          }
        },
        type: 'FETCH_USERS_SUCCESS'
      }];

      const store = mockStore();

      return store.dispatch(fetchUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchUser action', () => {
    it('should dispatch USER_FETCHED', () => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          user: { name: 'john' }
        }
      });

      const expectedActions = [{
        payload: {
          user: {
            name: 'john'
          }
        },
        type: 'USER_FETCHED'
      }];
      const store = mockStore();

      return store.dispatch(fetchUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateUser action', () => {
    it('should dispatch USER_UPDATED', () => {
      const user = {
        id: 1
      };

      moxios.stubRequest(`/api/users/${user.id}`, {
        status: 200,
        response: {
          updatedUser: {
            name: 'john'
          }
        }
      });

      const expectedActions = [{
        payload: { name: 'john'},
        type: 'USER_UPDATED'
      }];
      const store = mockStore();

      return store.dispatch(updateUser({id: 1}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateUser action', () => {
    it('should dispatch USER_UPDATED', () => {
      moxios.stubRequest(`/api/users/${1}`, {
        status: 200,
        response: {
          data: {
            updatedUser: {}
          }
        }
      });

      const expectedActions = [{
        payload: {
          id: 1
        }, type: 'USER_DELETED'
      }];

      const store = mockStore();

      return store.dispatch(deleteUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('searchUsers action', () => {
    it('should dispatch USER_UPDATED', () => {
      moxios.stubRequest('/api/search/users/?q=hello', {
        status: 200,
        response: {
          user: {
            name: 'john'
          }
        }
      });

      const expectedActions = [{
        payload: {
          user: { name: 'john'}
        }, type: 'USER_SEARCH_RESULTS'
      }];

      const store = mockStore();

      return store.dispatch(searchUsers('hello'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});