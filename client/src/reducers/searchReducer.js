// search reducer

import {
  FETCH_SEARCH_HISTORY,
  RECEIVE_SEARCH_HISTORY,
  FETCH_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_SEARCH_TERM
} from '../actions/actionTypes';

const initialState = {
  searchHistoryArr: [],
  searchResultsArr: [],
  searchTerm: '',
};

export default function searchReducer(state = initialState, action) {
  const {
    searchResultsArr,
    searchTerm,
    searchHistoryArr
  } = action;
  let newState;

  switch (action.type) {
    case FETCH_SEARCH_HISTORY:
      return action;
    case RECEIVE_SEARCH_HISTORY:
      newState = {
        ...state,
        searchHistoryArr,
      };
      return newState;
    case FETCH_SEARCH_RESULTS:
      return action;
    case RECEIVE_SEARCH_RESULTS:
      newState = {
        ...state,
        searchResultsArr,
      };
      return newState;
    case SET_SEARCH_TERM:
      newState = {
        ...state,
        searchTerm,
      }
      return newState;
    default:
      return state;
  }
}
