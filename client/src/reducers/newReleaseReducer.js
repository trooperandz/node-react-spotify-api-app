// new albums reducer

import {
  FETCH_NEW_RELEASES,
  RECEIVE_NEW_RELEASES,
  SET_COUNTRY_ID,
  SET_SELECTED_NEW_RELEASE_OBJ,
} from '../actions/actionTypes';

const initialState = {
  albumArr: [],
  selectedCountryId: 'US', // default the selection to U.S.
  selectedNewReleaseObj: { name: 'U.S.', id: 'US' },
};

export default function newReleaseReducer(state = initialState, action) {
  const { albumArr, selectedCountryId, selectedNewReleaseObj } = action;
  let newState;

  switch (action.type) {
    case FETCH_NEW_RELEASES:
      return action;
    case RECEIVE_NEW_RELEASES:
      newState = {
        ...state,
        albumArr,
      };
      return newState;
    case SET_COUNTRY_ID:
      newState = {
        ...state,
        selectedCountryId,
      };
      return newState;
    case SET_SELECTED_NEW_RELEASE_OBJ:
      newState = {
        ...state,
        selectedNewReleaseObj,
      };
      return newState;
    default:
      return state;
  }
}
