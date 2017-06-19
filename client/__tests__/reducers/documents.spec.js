import expect from 'expect';
import documents from '../../reducers/documents';
import * as types from '../../actions/types';
import initialState from '../../reducers/InitialState;

describe('Documents Reducer', () => {

  it ('should return initialState', () => {
    const firstState = {
      data: [],
      totalItems: 0,
      userDocuments: {
        data: [],
        totalItems: 0
      }
    }
    expect(firstState).toEqual(initialState.documents);
  });

  it('should set documents when passed ADD_DOCUMENT', () => {
    // arrange
    const initialState = {
      userDocuments: {
        data: [],
        totalItems: 0
      }
    }
    const documentToLoad = { document: { id: '4', title: 'Admin is back' } };

    const action = { type: types.ADD_DOCUMENT, payload: documentToLoad };

    const expectedState=  {
      userDocuments: {
        data: [{ id: '4', title: 'Admin is back' }],
        totalItems: 1
      }
    }
    // act
    const newState = documents(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set documents when passed SET_DOCUMENTS', () => {
    // arrange
    const documentToLoad = {
      rows: [
        { id: '1', title: 'Apata is big' },
        { id: '2', title: 'I am florishing' },
        { id: '3', title: 'Kenpachi abichi gana' }],
      count: 3
    };
    const action = { type: types.SET_DOCUMENTS, payload: documentToLoad };

    // act
    const newState = documents(initialState.documents, action);
    expect(newState.data).toEqual(documentToLoad.rows);
    expect(newState.totalItems).toEqual(documentToLoad.count);
  });

  it('should set documents when passed SET_USER_DOCUMENTS', () => {
    // arrange
    const documentToLoad = {
      rows: [
        { id: '1', title: 'Apata is big' },
        { id: '2', title: 'I am florishing' },
        { id: '3', title: 'Kenpachi abichi gana' }
      ],
      count: 3,
      metaData: {pagecount: 3}
    };
    const action = { type: types.SET_USER_DOCUMENTS, payload: documentToLoad };

    const newState = documents(initialState.documents, action);
    expect(newState.userDocuments.data).toEqual(documentToLoad.rows);
    expect(newState.userDocuments.totalItems).toEqual(documentToLoad.count);
  });

  it('should set document when passed DOCUMENT_FETCHED', () => {
    // arrange
    const initialState = {
      userDocuments: {
        data: [
          { id: '1', title: 'Apata is big' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' }],
        totalItems: 3
      }
    }

    const documentToLoad = { id: '4', title: 'Admin is back' };

    const action = { type: types.DOCUMENT_FETCHED, payload: documentToLoad };

    const expectedState=  {
      userDocuments: {
        data: [
          { id: '1', title: 'Apata is big' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' },
          { id: '4', title: 'Admin is back' }]
      }
    }
    // act
    const newState = documents(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update document when passed DOCUMENT_UPDATED', () => {
    // arrange

    const initialState = {
      userDocuments: {
        data: [
          { id: '1', title: 'Apata is big' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' }],
        totalItems: 3
      }
    }
    const document =  { id: '1', title: 'Sighting the Apata colery' };
    const action = { type: types.DOCUMENT_UPDATED, payload: document};

    const expectedState = {
      userDocuments: {
        data: [
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' },
          { id: '1', title: 'Sighting the Apata colery' }]
      }
    }

    // act
    const newState = documents(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set document when passed DOCUMENT_DELETED', () => {
    // arrange
    const initialState = {
      userDocuments: {
        data: [
          { id: '1', title: 'Sighting the Apata colery' },
          { id: '2', title: 'I am florishing' },
          { id: '3', title: 'Kenpachi abichi gana' }],
        totalItems: 3
      }
    }

    const loadedDocument = { id: '3', firstName: 'Kenpachi abichi gana' };

    const action = { type: types.DOCUMENT_DELETED, payload: loadedDocument };

    const expectedState=  {
      userDocuments: {
        data: [
          { id: '1', title: 'Sighting the Apata colery' },
          { id: '2', title: 'I am florishing' }],
        totalItems: 2
      }
    }
    // act
    const newState = documents(initialState, action);
    expect(newState).toEqual(expectedState);
  });


  it('should return the state when not affected', () => {
    // arrange
    const currentState = initialState.documents
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = documents(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
