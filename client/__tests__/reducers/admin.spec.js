import expect from 'expect';
import admin from '../../reducers/admin';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState';

describe('Admin Reducer', () => {

  it ('should return initialState', () => {
    const firstState = { users: [], totalUsers: 0 }

    expect(firstState).toEqual(initialState.admin);
  });

  it('should set users when passed FETCH_USERS_SUCCESS', () => {
    // arrange
    const loadedUsers = {
      rows: [
        { id: '1', firstName: 'Apata' },
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' }],
      count: 3
    };
    const action = { type: types.FETCH_USERS_SUCCESS, payload: loadedUsers };

    // act
    const newState = admin(initialState.admin, action);
    expect(newState.users).toEqual(loadedUsers.rows);
    expect(newState.totalUsers).toEqual(loadedUsers.count);
  });

  it('should set users when passed USER_FETCHED', () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', firstName: 'Apata' },
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' }],
      totalUsers: 3
    }

    const loadedUsers = { id: '4', firstName: 'Admin' };

    const action = { type: types.USER_FETCHED, payload: loadedUsers };

    const expectedState=  {
      users: [
        { id: '1', firstName: 'Apata' },
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' },
        { id: '4', firstName: 'Admin' } ],
      totalUsers: 4    }
    // act
    const newState = admin(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update user when passed USER_UPDATED', () => {
    // arrange

    const initialState = {
      users: [
        { id: '1', firstName: 'Apata' },
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' }],
      totalUsers: 3
    }
    const user =  { id: '2', firstName: 'Mercy' };
    const action = { type: types.USER_UPDATED, payload: user};

    const expectedState = {
      users: [
        { id: '1', firstName: 'Apata' },
        { id: '3', firstName: 'Kenpachi' },
        { id: '2', firstName: 'Mercy' }],
      totalUsers: 3
    };

    // act
    const newState = admin(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set users when passed USER_DELETED', () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', firstName: 'Apata' },
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' }],
      totalUsers: 3
    }

    const loadedUsers = { id: '1', firstName: 'Apata' };

    const action = { type: types.USER_DELETED, payload: loadedUsers };

    const expectedState=  {
      users: [
        { id: '2', firstName: 'Florish' },
        { id: '3', firstName: 'Kenpachi' }],
      totalUsers: 2    }
    // act
    const newState = admin(initialState, action);
    expect(newState).toEqual(expectedState);
  });


  it('should return the state when not affected', () => {
    // arrange
    const currentState = initialState.admin
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = admin(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
