import expect from 'expect';
import roles from '../../reducers/roles';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState';

describe('Foles Reducer', () => {

  it ('should return initialState', () => {
    const firstState = [];

    expect(firstState).toEqual(initialState.roles);
  });

  it('should set roles when passed ADD_ROLE', () => {
    // arrange
    const newRole = { id: '1', roleName: 'Admin' };

    const action = { type: types.ADD_ROLE, payload: newRole };

    const expectedState = [{ id: '1', roleName: 'Admin' }]

    // act
    const newState = roles(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set roles when passed SET_ROLES', () => {
    // arrange
    const role = [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' },
    ]
    const action = { type: types.SET_ROLES, payload: role };

    // act
    const newState = roles(initialState, action);
    expect(newState).toEqual(role);
  });

  it('should set role when passed ROLE_FETCHED', () => {
    // arrange
    const initialState = [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' }
    ]

    const role = { id: '3', roleName: 'Writers' };

    const action = { type: types.ROLE_FETCHED, payload: role };

    const expectedState=  [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' },
      { id: '3', roleName: 'Writers' }
    ]
    // act
    const newState = roles(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update role when passed ROLE_UPDATED', () => {
    // arrange

    const initialState = [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' },
      { id: '3', roleName: 'Writers' }
    ]
    const role =  { id: '3', roleName: 'Testers' };
    const action = { type: types.ROLE_UPDATED, payload: role};

    const expectedState = [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' },
      { id: '3', roleName: 'Testers' }
    ]

    // act
    const newState = roles(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set role when passed ROLE_DELETED', () => {
    // arrange
    const initialState = [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' },
      { id: '3', roleName: 'Writers' }
    ]

    const loadedRole = { id: '3', roleName: 'Writers' };

    const action = { type: types.ROLE_DELETED, payload: loadedRole };

    const expectedState=  [
      { id: '1', roleName: 'Admin' },
      { id: '2', roleName: 'Reviewers' }
    ]
    // act
    const newState = roles(initialState, action);
    expect(newState).toEqual(expectedState);
  });


  it('should return the state when not affected', () => {
    // arrange
    const currentState = initialState.roles
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = roles(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
