// playlist reducer

import initialState from './initialState';
import { FETCH_PLAYLIST, RECEIVE_PLAYLIST } from '../actions/actionTypes';

export default function playlistReducer(state = initialState.playlistObj, action) {
  let newState;

  switch (action.type) {
    case FETCH_PLAYLIST:
      console.log('FETCH_PLAYLIST Action')
      return action;
    case RECEIVE_PLAYLIST:
      newState = action.payload;
      console.log('RECEIVE_PLAYLIST Action')
      return newState;
    default:
      return state;
  }
}
