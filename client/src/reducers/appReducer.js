/**
 * App-wide, container-agnostic reducers
 */

import {
  RECEIVE_ACCESS_TOKEN,
  RECEIVE_DEVICE_ID,
  RECEIVE_PLAYBACK_STATE,
  RECEIVE_PLAYER_STATE,
  RECEIVE_PAUSED_PLAYER_STATE,
} from '../actions/actionTypes';

const initialState = {
  accessToken: '',
  deviceId: '',
  playbackState: {},
  playerState: {},
  pausedPlayerState: {},
};

export default function appReducer(state = initialState, action) {
  const {
    accessToken,
    deviceId,
    playbackState,
    playerState,
    pausedPlayerState,
  } = action;

  let newState;

  switch(action.type) {
    case RECEIVE_ACCESS_TOKEN:
      newState = {
        ...state,
        accessToken,
      };
      return newState;
    case RECEIVE_DEVICE_ID:
      newState = {
        ...state,
        deviceId,
      };
      return newState;
    case RECEIVE_PLAYBACK_STATE:
      newState = {
        ...state,
        playbackState,
      };
      return newState;
    case RECEIVE_PLAYER_STATE:
      newState = {
        ...state,
        playerState,
      };
      return newState;
    case RECEIVE_PAUSED_PLAYER_STATE:
      newState = {
        ...state,
        pausedPlayerState,
      };
      return newState;
    default:
      return state;
  }
}