/** jsx */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import routes from '../config/routes';
import rootReducer from '../reducers';

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
