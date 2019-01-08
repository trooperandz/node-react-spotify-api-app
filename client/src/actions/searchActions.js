// For search container
import axios from 'axios';

import {
  REQUEST_SEARCH_HISTORY,
  FETCH_SEARCH_HISTORY,
  RECEIVE_SEARCH_HISTORY,
  FETCH_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_SEARCH_TERM,
} from './actionTypes';

// Can use this for a loader
function requestSearchHistory() {
  return {
    type: REQUEST_SEARCH_HISTORY,
  };
}

/**
 * Get user search history from the database
 * @return {Array} An array of { name, id } objects user previously searched for
 */
function fetchSearchHistory() {
  return (dispatch) => {
    dispatch(requestSearchHistory());

    axios.get('/search/history')
      .then((response) => {
        dispatch(receiveSearchHistory(response.data.searchArr));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function receiveSearchHistory(searchHistoryArr) {
  return {
    type: RECEIVE_SEARCH_HISTORY,
    searchHistoryArr,
  };
}

// Save search term when user clicks on a search result
function saveSearchTerm(searchTerm) {
  return (dispatch) => {
    axios.post(`/search/save?searchTerm=${searchTerm}`)
      .then((response) => {
        // no-op; the side nav search populates itself on component remounting
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

function receiveSearchResults(searchResultsArr) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    searchResultsArr,
  };
}

// Save search value when user types into the search input
function setSearchTerm(searchTerm) { console.log('setSearchTerm running... searchTerm = ', searchTerm)
  return {
    type: SET_SEARCH_TERM,
    searchTerm,
  };
}

export default {
  requestSearchHistory,
  fetchSearchHistory,
  receiveSearchHistory,
  requestSearchResults,
  fetchSearchResults,
  receiveSearchResults,
  setSearchTerm,
  saveSearchTerm,
};