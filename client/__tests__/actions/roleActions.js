import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  createRole,
  fetchRoles,
  fetchRole,
  updateRole,
  deleteRole,
} from '../../actions/roleActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('Role actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('createRole action', () => {
    it('should dispatch ADD_ROLE', () => {
      moxios.stubRequest('/api/roles', {
        status: 200,
        response: {
          role: { roleName: 'publisher' }
        }
      });

      const expectedActions = [{
        payload: {
          roleName: 'publisher'
        }, type: 'ADD_ROLE'
      }];

      const store = mockStore();

      return store.dispatch(createRole())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetchRoles action', () => {
    it('should dispatch SET_ROLES', () => {
      moxios.stubRequest('/api/roles', {
        status: 200,
        response: {
          role: { roleName: 'publisher' }
        }
      });

      const expectedActions = [{
        payload: {
          roleName: 'publisher'
        },
        type: 'SET_ROLES'
      }];

      const store = mockStore();

      return store.dispatch(fetchRoles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchRole action', () => {
    it('should dispatch ROLE_FETCHED', () => {
      moxios.stubRequest('/api/roles/1', {
        status: 200,
        response: {
          role: { roleName: 'publisher' }
        }
      });

      const expectedActions = [{
        payload: {
          roleName: 'publisher'
        },
        type: 'ROLE_FETCHED'
      }];
      const store = mockStore();

      return store.dispatch(fetchRole(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateRole action', () => {
    it('should dispatch ROLE_UPDATED', () => {
      const role = {
        id: 1,
        roleName: 'publisherFile'
      };

      moxios.stubRequest(`/api/roles/${role.id}`, {
        status: 200,
        response: {
          role: {
            name: 'john'
          }
        }
      });

      const expectedActions = [{
        payload: { name: 'john'},
        type: 'ROLE_UPDATED'
      }];
      const store = mockStore();

      return store.dispatch(updateRole({id: 1}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteRole action', () => {
    it('should dispatch ROLE_DELETED', () => {
      moxios.stubRequest(`/api/roles/${1}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [{
        payload: {
          id: 1
        }, type: 'ROLE_DELETED'
      }];

      const store = mockStore();

      return store.dispatch(deleteRole(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});