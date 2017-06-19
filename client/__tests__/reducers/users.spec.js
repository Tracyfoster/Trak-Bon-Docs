import expect from 'expect';
import users from '../../reducers/users';
import * as types from '../../actions/types';
import initialState from '../../reducers/initialState';

describe('Users Reducer', () => {
  it ('should return initialState', () => {
    const firstState = { created: false }

    expect(firstState).toEqual(initialState.users);
  });
  it('should set created to true when passed NEW_USER', () => {
    // arrange
    const action = { type: types.NEW_USER };

    const expectedState = {
      created: true
    };

    // act
    const newState = users(initialState.users, action);

    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      created: false,
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = users(initialState.users, action);

    expect(newState).toEqual(currentState);
  });
});