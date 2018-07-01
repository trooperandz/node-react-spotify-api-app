// Brings all of the reducers together

import { combineReducers } from 'redux';
import newReleaseReducer from './newReleaseReducer';

const rootReducer = combineReducers({
  albumArr: newReleaseReducer,
});

export default rootReducer;