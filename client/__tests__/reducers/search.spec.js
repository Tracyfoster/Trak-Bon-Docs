import expect from 'expect';
import search from '../../reducers/search';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState;

describe('Search Reducer', () => {

  it ('should return initialState', () => {
    const firstState = {
      documents: {
        data: [],
        totalItems: 0
      },
      users: {
        data: [],
        totalUsers: 0
      }
    }
    expect(firstState).toEqual(initialState.search);
  });

  it('should set search when passed DOCUMENT_SEARCH_RESULTS', () => {
    // arrange
    const searchResults = {
      documents: {
        rows: [
          { id: '1', title: 'Apata is big' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' }],
        count: 3
      }
    };
    const action = { type: types.DOCUMENT_SEARCH_RESULTS, payload: searchResults };

    // act
    const newState = search(initialState.search, action);
    expect(newState.documents.data).toEqual(searchResults.documents.rows);
    expect(newState.documents.totalItems).toEqual(searchResults.documents.count);
  });

  it('should set search when passed USER_SEARCH_RESULTS', () => {
    // arrange
    const searchResults = {
        rows: [
          { id: '1', title: 'Apata is big' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' }],
        count: 3
    };
    const action = { type: types.USER_SEARCH_RESULTS, payload: searchResults };

    // act
    const newState = search(initialState.search, action);
    expect(newState.users.data).toEqual(searchResults.rows);
    expect(newState.users.totalItems).toEqual(searchResults.count);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = initialState.search
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = search(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
