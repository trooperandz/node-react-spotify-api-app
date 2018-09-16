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
      console.log('FETCH_SEARCH_HISTORY Action firing...')
      return action;
    case RECEIVE_SEARCH_HISTORY:
      console.log('RECEIVE_SEARCH_HISTORY Action firing...')
      newState = {
        ...state,
        searchHistoryArr,
      };
      return newState;
    case FETCH_SEARCH_RESULTS:
      console.log('FETCH_SEARCH_RESULTS Action firing...')
      return action;
    case RECEIVE_SEARCH_RESULTS:
      console.log('searchResultsArr in searchReducer: ', searchResultsArr);
      newState = {
        ...state,
        searchResultsArr,
      };
      console.log('RECEIVE_SEARCH_RESULTS Action firing...')
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
