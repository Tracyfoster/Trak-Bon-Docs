import expect from 'expect';
import folders from '../../reducers/folders';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState';

describe('Folders Reducer', () => {

  it ('should return initialState', () => {
    const firstState = [];

    expect(firstState).toEqual(initialState.folders);
  });

  it('should set folders when passed ADD_FOLDER', () => {
    // arrange
    const newFolder = { id: '1', folderName: 'Jokes' };

    const action = { type: types.ADD_FOLDER, payload: newFolder };

    const expectedState = [{ id: '1', folderName: 'Jokes' }]

    // act
    const newState = folders(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set folders when passed SET_FOLDERS', () => {
    // arrange
    const folder = [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' },
    ]
    const action = { type: types.SET_FOLDERS, payload: folder };

    // act
    const newState = folders(initialState, action);
    expect(newState).toEqual(folder);
  });

  it('should set folder when passed FOLDER_FETCHED', () => {
    // arrange
    const initialState = [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' }
    ]

    const folder = { id: '3', folderName: 'Favorites' };

    const action = { type: types.FOLDER_FETCHED, payload: folder };

    const expectedState=  [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' },
      { id: '3', folderName: 'Favorites' }
    ]
    // act
    const newState = folders(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update folder when passed FOLDER_UPDATED', () => {
    // arrange

    const initialState = [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' },
      { id: '3', folderName: 'Favorites' }
    ]
    const folder =  { id: '3', folderName: 'Testers' };
    const action = { type: types.FOLDER_UPDATED, payload: folder};

    const expectedState = [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' },
      { id: '3', folderName: 'Testers' }
    ]

    // act
    const newState = folders(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set folder when passed FOLDER_DELETED', () => {
    // arrange
    const initialState = [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' },
      { id: '3', folderName: 'Favorites' }
    ]

    const loadedFolder = { id: '3', folderName: 'Favorites' };

    const action = { type: types.FOLDER_DELETED, payload: loadedFolder };

    const expectedState=  [
      { id: '1', folderName: 'Jokes' },
      { id: '2', folderName: 'Tests' }
    ]
    // act
    const newState = folders(initialState, action);
    expect(newState).toEqual(expectedState);
  });


  it('should return the state when not affected', () => {
    // arrange
    const currentState = initialState.folders
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = folders(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
