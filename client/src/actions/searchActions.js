// For search container
import axios from 'axios';

import {
  FETCH_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_SEARCH_TERM,
} from './actionTypes';

function fetchSearchResults(searchTerm) {
  return (dispatch) => {
    dispatch(requestSearchResults());

    // Note: returns both albums and tracks with “searchTerm” included in their name
    axios.get(`/search?q=${searchTerm}&type=album`)
      .then((response) => {
        dispatch(receiveSearchResults(response.data.searchResultsArr));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function requestSearchResults() {
  return {
    type: REQUEST_SEARCH_RESULTS,
  };
}

function receiveSearchResults(searchResultsArr) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    searchResultsArr,
  };
}

function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm,
  };
}

export default {
  requestSearchResults,
  fetchSearchResults,
  receiveSearchResults,
  setSearchTerm,
};