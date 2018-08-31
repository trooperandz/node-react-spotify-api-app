// Brings all of the reducers together

import { combineReducers } from 'redux';
import newReleaseReducer from './newReleaseReducer';
import categoriesReducer from './categoriesReducer';
import playlistReducer from './playlistReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  newReleases: newReleaseReducer,
  categories: categoriesReducer,
  playlist: playlistReducer,
  search: searchReducer,
});

export default rootReducer;