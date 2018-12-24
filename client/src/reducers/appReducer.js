/**
 * App-wide, container-agnostic reducers
 */

import {
  RECEIVE_ACCESS_TOKEN,
  RECEIVE_DEVICE_ID,
  RECEIVE_PLAYBACK_STATE,
  RECEIVE_PLAYER_STATE,
} from '../actions/actionTypes';

const initialState = {
  accessToken: '',
  deviceId: '',
  playbackState: {},
  playerState: {},
};

export default function appReducer(state = initialState, action) {
  const { accessToken, deviceId, playbackState, playerState } = action;
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
      console.log('RECEIVE_PLAYBACK_STATE reducer fired, newState = ', newState);
      return newState;
    case RECEIVE_PLAYER_STATE:
      newState = {
        ...state,
        playerState,
      };
      return newState;
    default:
      return state;
  }
}