/**
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import createStore from './redux/create';
import combineReducers from './reducers';

import AppContainer from './containers/AppContainer';

const store = createStore(combineReducers);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
