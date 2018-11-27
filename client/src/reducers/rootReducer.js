// Brings all of the reducers together

import { combineReducers } from 'redux';
import newReleaseReducer from './newReleaseReducer';
import categoriesReducer from './categoriesReducer';
import playlistReducer from './playlistReducer';
import searchReducer from './searchReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  newReleases: newReleaseReducer,
  categories: categoriesReducer,
  playlist: playlistReducer,
  search: searchReducer,
  app: appReducer,
});

export default rootReducer;