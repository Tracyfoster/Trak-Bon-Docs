import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  createFolder,
  fetchFolders,
  fetchFolder,
  updateFolder,
  deleteFolder,
} from '../../actions/folderActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('Folder actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('createFolder action', () => {
    it('should dispatch ADD_FOLDER', () => {
      moxios.stubRequest('/api/folders', {
        status: 200,
        response: {
          folderName: 'Jokes',
          userId: 22
        }
      });

      const expectedActions = [{
        payload: {
          folderName: 'Jokes',
          userId: 22
        }, type: 'ADD_FOLDER'
      }];

      const store = mockStore();

      return store.dispatch(createFolder())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetchFolders action', () => {
    it('should dispatch SET_FOLDERS', () => {
      moxios.stubRequest('/api/folders', {
        status: 200,
        response: {
          folder: { folderName: 'Jokes' }
        }
      });

      const expectedActions = [{
        payload: {
          folderName: 'Jokes'
        },
        type: 'SET_FOLDERS'
      }];

      const store = mockStore();

      return store.dispatch(fetchFolders())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchFolder action', () => {
    it('should dispatch FOLDER_FETCHED', () => {
      moxios.stubRequest('/api/folders/1', {
        status: 200,
        response: {
          folder: { folderName: 'Jokes' }
        }
      });

      const expectedActions = [{
        payload: {
          folderName: 'Jokes'
        },
        type: 'FOLDER_FETCHED'
      }];
      const store = mockStore();

      return store.dispatch(fetchFolder(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateFolder action', () => {
    it('should dispatch FOLDER_UPDATED', () => {
      const folder = {
        id: 1,
        folderName: 'JokesFile',
        userId: 22
      };

      moxios.stubRequest(`/api/folders/${folder.id}`, {
        status: 200,
        response: {
          folder: {
            name: 'john'
          }
        }
      });

      const expectedActions = [{
        payload: { name: 'john'},
        type: 'FOLDER_UPDATED'
      }];
      const store = mockStore();

      return store.dispatch(updateFolder({id: 1}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteFolder action', () => {
    it('should dispatch FOLDER_DELETED', () => {
      moxios.stubRequest(`/api/folders/${1}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [{
        payload: {
          id: 1
        }, type: 'FOLDER_DELETED'
      }];

      const store = mockStore();

      return store.dispatch(deleteFolder(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});