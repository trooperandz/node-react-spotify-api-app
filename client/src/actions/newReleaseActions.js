// For new releases container
import axios from 'axios';

import {
  REQUEST_NEW_RELEASES,
  FETCH_NEW_RELEASES,
  RECEIVE_NEW_RELEASES,
  SET_COUNTRY_ID,
  SET_SELECTED_NEW_RELEASE_OBJ,
} from './actionTypes';

// Get new releases by country code
function fetchNewReleases(countryCode) {
  return (dispatch) => {
    dispatch(requestNewReleases());

    axios.get(`/new-releases?countryCode=${countryCode}`)
      .then((response) => {
        console.log('response: ', response);
        dispatch(receiveNewReleases(response.data.albumArr));
      })
      .catch((error) =>  {
        console.log(error);
      });
  }
}

// TODO: add a loader here?
function requestNewReleases() {
  return {
    type: REQUEST_NEW_RELEASES,
  };
}

// Receive an array of album objects after initial new release request
function receiveNewReleases(albumArr) {
  return {
    type: RECEIVE_NEW_RELEASES,
    albumArr,
  };
}

// Set the country id state so that it remains on next component mount
function setCountryId(selectedCountryId) {
  return {
    type: SET_COUNTRY_ID,
    selectedCountryId,
  };
}

function setSelectedNewReleaseObj(selectedNewReleaseObj) {
  return {
    type: SET_SELECTED_NEW_RELEASE_OBJ,
    selectedNewReleaseObj,
  }
}

export default {
  requestNewReleases,
  fetchNewReleases,
  receiveNewReleases,
  setCountryId,
  setSelectedNewReleaseObj,
};