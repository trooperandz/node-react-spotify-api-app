/**
 * App-wide, container-agnostic reducers
 */

import {
  RECEIVE_ACCESS_TOKEN,
} from '../actions/actionTypes';

const initialState = {
  accessToken: '',
};

export default function appReducer(state = initialState, action) {
  const { accessToken } = action;
  console.log('accessToken in appReducer: ', accessToken)
  let newState;

  switch(action.type) {
    case RECEIVE_ACCESS_TOKEN:
      newState = {
        ...state,
        accessToken,
      };
      return newState;
    default:
      return state;
  }
}