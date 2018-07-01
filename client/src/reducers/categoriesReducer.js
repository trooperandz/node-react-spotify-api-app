// categories reducer

import initialState from './initialState';
import { FETCH_CATEGORIES, RECEIVE_CATEGORIES } from '../actions/actionTypes';

export default function categoriesReducer(state = initialState.categoriesArr, action) {
  let newState;

  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log('FETCH_CATEGORIES Action')
      return action;
    case RECEIVE_CATEGORIES:
      newState = action.payload;
      console.log('RECEIVE_CATEGORIES Action')
      return newState;
    default:
      return state;
  }
}
