import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  registerUser,
  createUser,
  userLogin,
  logoutUser
} from '../../actions/userActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('user Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('registerUser action', () => {
    it('should dispatch SET_CURRENT_USER', () => {
      moxios.stubRequest('/api/users', {
        status: 200,
        response: {
          data: {
            token: '1234567890'
          }
        }
      });

      const expectedActions = [{
        payload: {
          token: '1234567890'
        }, type: 'SET_CURRENT_USER'
      }];

      const store = mockStore();

      return store.dispatch(registerUser({ name: 'jane doe'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });


  describe('createUser action', () => {
    it('should dispatch NEW_USER', () => {
      moxios.stubRequest('/api/users', {
        status: 200,
        response: {
          data: {
            name: 'jane doe'
          }
        }
      });

      const expectedActions = [{
        type: 'NEW_USER'
      }];

      const store = mockStore();
      return store.dispatch(createUser({ name: 'jane doe'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('userLogin action', () => {
    it('should dispatch SET_CURRENT_USER', () => {
      moxios.stubRequest('/api/users/login', {
        status: 200,
        response: {
          data: {
            token: '1234567890abcdef'
          }
        }
      });

      const expectedActions = [{
        payload: {
          token: '1234567890abcdef'
        }, type: 'SET_CURRENT_USER'
      }];

      const store = mockStore();
      return store.dispatch(userLogin({ email: 'jane@doe.com'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('logoutUser action', () => {
    it('should dispatch SET_CURRENT_USER', () => {
      moxios.stubRequest('/api/users/logout', {
        status: 200,
        response: {
          data: {
            token: {}
          }
        }
      });

      const expectedActions = [{
        payload: {},
        type: 'SET_CURRENT_USER'
      }];

      const store = mockStore();
      return store.dispatch(logoutUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
