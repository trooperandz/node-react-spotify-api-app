// new albums reducer

// import initialState from './initialState';
import { FETCH_NEW_RELEASES, RECEIVE_NEW_RELEASES, SET_COUNTRY_ID } from '../actions/actionTypes';

const initialState = {
  albumArr: [],
  selectedCountryId: 'US',
};

export default function newReleaseReducer(state = initialState, action) {
  const { albumArr, selectedCountryId } = action;
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
    default:
      return state;
  }
}
