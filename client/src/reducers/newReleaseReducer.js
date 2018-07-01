// new albums reducer

import initialState from './initialState';
import { FETCH_NEW_RELEASES, RECEIVE_NEW_RELEASES } from '../actions/actionTypes';

export default function newReleaseReducer(state = initialState.albumArr, action) {
  let newState;

  switch (action.type) {
    case FETCH_NEW_RELEASES:
      console.log('FETCH_NEW_RELEASES Action')
      return action;
    case RECEIVE_NEW_RELEASES:
      newState = action.payload;
      console.log('RECEIVE_NEW_RELEASES Action')
      return newState;
    default:
      return state;
  }
}
