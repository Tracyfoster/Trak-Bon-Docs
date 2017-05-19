/** jsx */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import routes from '../config/routes';
import MainLayout from '../Pages/MainLayout';
import HomePage from '../Pages/HomePage';
import DocumentEditor from '../Pages/DocumentEditor';
import AdminPage from '../Pages/AdminPage';
import rootReducer from '../reducers';
import UsersPage from '../components/userComponents/UsersPage';
import DocumentPage from '../components/documentComponents/DocumentPage';
import FolderPage from '../components/folderComponents/FolderPage';
import SearchPage from '../components/search/SearchPage';

const store = createStore(
    rootReducer,
    compose(
     applyMiddleware(thunkMiddleware),
     window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
      </Provider>
    );
  }
}


export default App;
