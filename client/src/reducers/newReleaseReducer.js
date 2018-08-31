// new albums reducer

import { FETCH_NEW_RELEASES, RECEIVE_NEW_RELEASES, SET_COUNTRY_ID, FETCH_ALBUM, RECEIVE_ALBUM } from '../actions/actionTypes';

const initialState = {
  albumArr: [],
  selectedCountryId: 'US',
  albumObj: {},
};

export default function newReleaseReducer(state = initialState, action) {
  const { albumArr, selectedCountryId, albumObj } = action;
  let newState;

  switch (action.type) {
    case FETCH_NEW_RELEASES:
      console.log('FETCH_NEW_RELEASES Action firing...')
      return action;
    case RECEIVE_NEW_RELEASES:
      newState = {
        ...state,
        albumArr,
      };
      console.log('RECEIVE_NEW_RELEASES Action firing...')
      return newState;
    case SET_COUNTRY_ID:
      newState = {
        ...state,
        selectedCountryId,
      }
      return newState;
    case FETCH_ALBUM:
      console.log('FETCH_ALBUM Action firing...')
      return action;
    case RECEIVE_ALBUM:
      newState = {
        ...state,
        albumObj,
      };
      return newState;
    default:
      return state;
  }
}
