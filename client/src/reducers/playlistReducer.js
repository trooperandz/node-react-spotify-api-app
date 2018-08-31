// playlist reducer

import { FETCH_PLAYLIST, RECEIVE_PLAYLIST } from '../actions/actionTypes';

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
    default:
      return state;
  }
}
