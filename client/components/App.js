/** jsx */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, hashHistory } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createStore, applyMiddleware, compose } from 'redux';
import routes from '../config/routes';
import rootReducer from '../reducers';
import { eventAction, setAuthorizationToken, isAdmin } from '../utils/Utils';
import { SET_CURRENT_USER } from '../actions/types';
import '../css/style.css';
import '../../node_modules/toastr/build/toastr.min.css'

const store = createStore(
    rootReducer,
    compose(
     applyMiddleware(thunkMiddleware),
     window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
  const user = jwtDecode(localStorage.jwtToken);
  setAuthorizationToken(localStorage.jwtToken);
  axios.defaults.headers.common.Authorization = localStorage.jwtToken;
  store.dispatch(eventAction(SET_CURRENT_USER, (user)));
}


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
