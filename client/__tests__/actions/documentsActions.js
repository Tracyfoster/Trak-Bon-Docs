import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  saveDocument,
  fetchDocuments,
  fetchDocument,
  updateDocument,
  deleteDocument,
  fetchUserDocuments,
  searchDocuments
} from '../../actions/documentActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);


describe('document Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('saveDocument action', () => {
    it('should dispatch ADD_DOCUMENT', () => {
      moxios.stubRequest('/api/documents', {
        status: 200,
        response: {
          document: { title: 'hello'}
        }
      });

      const expectedActions = [{
        payload: {
          document: { title: 'hello' }
        }, type: 'ADD_DOCUMENT'
      }];

      const store = mockStore();

      return store.dispatch(saveDocument())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetchDocuments action', () => {
    it('should dispatch SET_DOCUMENTS', () => {
      moxios.stubRequest('/api/documents', {
        status: 200,
        response: {
          documents: {
            title: 'hello'
          }
        }
      });

      const expectedActions = [{
        payload: {
          documents: { title: 'hello' }
        }, type: 'SET_DOCUMENTS'
      }];

      const store = mockStore();

      return store.dispatch(fetchDocuments())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchDocument action', () => {
    it('should dispatch DOCUMENT_FETCHED', () => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          document: {
            title: 'hello'
          }
        }
      });

      const expectedActions = [{
        payload: {
          title: 'hello'
        }, type: 'DOCUMENT_FETCHED'
      }]

      const store = mockStore();

      return store.dispatch(fetchDocument(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateDocument action', () => {
    it('should dispatch DOCUMENT_FETCHED', () => {

      const data = { id: 1 };

      moxios.stubRequest(`/api/documents/${data.id}`, {
        status: 200,
        response: {
          updatedDoc: {
            title: 'hello'
          }
        }
      });

      const expectedActions = [{
        payload: {
          title: 'hello'},
          type: 'DOCUMENT_UPDATED'
        }];

      const store = mockStore();

      return store.dispatch(updateDocument(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteDocument action', () => {
    it('should dispatch DOCUMENT_DELETED', () => {

      const data = { id: 1 };

      moxios.stubRequest(`/api/documents/${data.id}`, {
        status: 200,
        response: {
          updatedDoc: {
            title: 'hello'
          }
        }
      });

      const expectedActions = [{
        payload: {
          id: 1,
        },
        type: 'DOCUMENT_DELETED'
      }];

      const store = mockStore();

      return store.dispatch(deleteDocument(data.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchUserDocuments action', () => {
    it('should dispatch SET_USER_DOCUMENTS', () => {

      const user = { id: 1 };

      moxios.stubRequest(`/api/users/${user.id}/documents`, {
        status: 200,
        response: {
          documents: {
            title: 'hello world'
          }
        }
      });

      const expectedActions = [{
        payload: {
          documents: { title: 'hello world' }
        }, type: 'SET_USER_DOCUMENTS'
      }];

      const store = mockStore();

      return store.dispatch(fetchUserDocuments(user.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('searchDocuments action', () => {
    it('should dispatch DOCUMENT_SEARCH_RESULTS', () => {
      moxios.stubRequest('/api/search/documents/?q=hello', {
        status: 200,
        response: {
          documents: {
            title: 'hello'
          }
        }
      });

      const expectedActions = [{
        payload: {
          documents: {
            title: 'hello'
          }
        }, type: 'DOCUMENT_SEARCH_RESULTS'
      }];

      const store = mockStore();

      return store.dispatch(searchDocuments('hello'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});