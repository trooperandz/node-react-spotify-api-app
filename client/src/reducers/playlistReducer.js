// playlist reducer

import {
  FETCH_PLAYLIST,
  RECEIVE_PLAYLIST,
  FETCH_ALBUM,
  RECEIVE_ALBUM,
  RECEIVE_PLAYLIST_HISTORY,
} from '../actions/actionTypes';

const initialState = {
  playlistObj: {},
  playlistHistoryArr: [],
}

export default function playlistReducer(state = initialState, action) {
  const { playlistObj, playlistHistoryArr } = action;
  let newState;

  switch (action.type) {
    case FETCH_PLAYLIST:
      return action;
    case RECEIVE_PLAYLIST:
      newState = {
        ...state,
        playlistObj,
      };
      return newState;
    case FETCH_ALBUM:
      return action;
    case RECEIVE_ALBUM:
      newState = {
        ...state,
        playlistObj,
      };
      return newState;
    case RECEIVE_PLAYLIST_HISTORY:
      newState = {
        ...state,
        playlistHistoryArr,
      };
      return newState;
    default:
      return state;
  }
}
