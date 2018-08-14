// Brings all of the reducers together

import { combineReducers } from 'redux';
import newReleaseReducer from './newReleaseReducer';
import categoriesReducer from './categoriesReducer';
import playlistReducer from './playlistReducer';

const rootReducer = combineReducers({
  albumArr: newReleaseReducer,
  categoriesArr: categoriesReducer,
  playlistObj: playlistReducer,
});

export default rootReducer;