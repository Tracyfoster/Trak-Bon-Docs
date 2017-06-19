import expect from 'expect';
import auth from '../../reducers/auth';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState';

describe('Auth Reducer', () => {
  it ('should return initialState', () => {
    const firstState = { isAuthenticated: false, user: {} }

    expect(firstState).toEqual(initialState.auth);
  });
  it('should set user profile when passed SET_CURRENT_USER', () => {
    // arrange
    const user = { id: 1, email: 'admin@admin.com', roleId: 1 };
    const action = { type: types.SET_CURRENT_USER, payload: user };

    const expectedState = {
      isAuthenticated: true, user: { id: 1, email: 'admin@admin.com', roleId: 1 }
    };

    // act
    const newState = auth(initialState.auth, action);

    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      isAuthenticated: false,
      user: {}
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = auth(initialState.auth, action);

    expect(newState).toEqual(currentState);
  });
});