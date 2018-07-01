// Brings all of the reducers together

import { combineReducers } from 'redux';
import newReleaseReducer from './newReleaseReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  albumArr: newReleaseReducer,
  categoriesArr: categoriesReducer,
});

export default rootReducer;