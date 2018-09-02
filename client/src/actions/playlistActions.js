// For detail container
import axios from 'axios';

import {
  REQUEST_PLAYLIST,
  FETCH_PLAYLIST,
  RECEIVE_PLAYLIST,
  REQUEST_ALBUM_DETAIL,
  FETCH_ALBUM,
  RECEIVE_ALBUM,
} from './actionTypes';

function fetchPlaylist(ownerId = 'spotify', playlistId = '37i9dQZF1DX7YCknf2jT6s') {
  console.log('ownerId in fetchPlaylist action: ', ownerId, ' playlistId: ', playlistId);
  return (dispatch) => {
    dispatch(requestPlaylist());

    axios.get(`/playlist?userId=${ownerId}&playlistId=${playlistId}`)
      .then((response) => {
        console.log('fetchPlaylist response: ', response);
        dispatch(receivePlaylist(response.data.playlist));
      })
      .catch((error) =>  {
        console.log(error);
      });
  };
}

// TODO: add a loader here?
function requestPlaylist() {
  return {
    type: REQUEST_PLAYLIST,
  };
}

function receivePlaylist(playlistObj) {
  return {
    type: RECEIVE_PLAYLIST,
    playlistObj,
  };
}

// Get album data for display in the detail container if an album is clicked
function fetchAlbum(albumId) {
  console.log('fetchAlbum running...')
  return (dispatch) => {
    dispatch(requestAlbumDetail());

    axios.get(`/album?albumId=${albumId}`)
      .then((response) => {
        console.log('\n\n\nfetchAlbum response: ', response, '\n\n\n');
        dispatch(receiveAlbum(response.data.playlistObj));
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

// Receive the returned album playlist object from the initial album fetch
function receiveAlbum(playlistObj) {
  return {
    type: RECEIVE_ALBUM,
    playlistObj,
  };
}

export default {
  requestPlaylist,
  fetchPlaylist,
  receivePlaylist,
  requestAlbumDetail,
  fetchAlbum,
  receiveAlbum,
};