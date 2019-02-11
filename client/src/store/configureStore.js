// Get everything talking to the app...

import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk)),
  );
  console.log('store in configureStore: ', store.getState());
  return store;
}
