// For new releases container
import axios from 'axios';

import {
  REQUEST_NEW_RELEASES,
  FETCH_NEW_RELEASES,
  RECEIVE_NEW_RELEASES,
  SET_COUNTRY_ID,
  REQUEST_ALBUM_DETAIL,
  FETCH_ALBUM,
  RECEIVE_ALBUM,
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

// Get album data for display in the detail container if an album is clicked
function fetchAlbum(albumId) {
  console.log('fetchAlbum running...')
  return (dispatch) => {
    dispatch(requestAlbumDetail());

    axios.get(`/album?albumId=${albumId}`)
      .then((response) => {
        console.log('\n\n\nfetchAlbum response: ', response, '\n\n\n');
        dispatch(receiveAlbum(response.data.albumObj));
      })
      .catch((error) =>  {
        console.log(error);
      });
  }
}

function requestAlbumDetail() {
  return {
    type: REQUEST_ALBUM_DETAIL,
  }
}

// Receive the returned album object from the initial album fetch
function receiveAlbum(albumObj) {
  return {
    type: RECEIVE_ALBUM,
    albumObj,
  };
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

export default {
  requestNewReleases,
  fetchNewReleases,
  receiveNewReleases,
  setCountryId,
  requestAlbumDetail,
  fetchAlbum,
  receiveAlbum,
};