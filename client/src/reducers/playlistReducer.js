// playlist reducer

import {
  FETCH_PLAYLIST,
  RECEIVE_PLAYLIST,
  FETCH_ALBUM,
  RECEIVE_ALBUM
} from '../actions/actionTypes';

const initialState = {
  playlistObj: {},
}

export default function playlistReducer(state = initialState, action) {
  const { playlistObj } = action;
  let newState;

  switch (action.type) {
    case FETCH_PLAYLIST:
      console.log('FETCH_PLAYLIST Action')
      return action;
    case RECEIVE_PLAYLIST:
      console.log('RECEIVE_PLAYLIST Action')
      newState = {
        ...state,
        playlistObj,
      };
      return newState;
    case FETCH_ALBUM:
      console.log('FETCH_ALBUM action fired')
      return action;
    case RECEIVE_ALBUM:
      newState = {
        ...state,
        playlistObj,
      };
      return newState;
    default:
      return state;
  }
}
