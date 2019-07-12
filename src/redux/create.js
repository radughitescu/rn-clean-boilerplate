/**
 * Created by radughitescu on 12/07/2019
 */

import { createStore as _createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import createMiddleware from './middleware/client-middleware';
import reducer from './../reducers';

export default function createStore(history, client, data) {
  const middleware = [createMiddleware(client), ReduxThunk];

  const store = _createStore(reducer, applyMiddleware(...middleware));

  return store;
}
