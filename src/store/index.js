import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers'; //import reducer from '../reducers/index.js'; it is similar

let store;
export function configureStore() {
  // creating the store
  // in createstore we only can pass one reducers that why we are combinig the reducers and passing to combinereducer
  store = createStore(reducer, applyMiddleware(thunk, logger)); // thunk is special type of function that return function
  return store;
}
