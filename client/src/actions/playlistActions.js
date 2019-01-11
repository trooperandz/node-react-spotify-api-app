// For detail container
import axios from 'axios';

import {
  REQUEST_PLAYLIST,
  FETCH_PLAYLIST,
  RECEIVE_PLAYLIST,
  REQUEST_ALBUM_DETAIL,
  FETCH_ALBUM,
  RECEIVE_ALBUM,
  REQUEST_PLAYLIST_HISTORY,
  RECEIVE_PLAYLIST_HISTORY,
} from './actionTypes';

function fetchPlaylist(ownerId = 'spotify', playlistId = '37i9dQZF1DX7YCknf2jT6s') {
  return (dispatch) => {
    dispatch(requestPlaylist());

    axios.get(`/playlist?userId=${ownerId}&playlistId=${playlistId}`)
      .then((response) => {
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
  return (dispatch) => {
    dispatch(requestAlbumDetail());

    axios.get(`/album?albumId=${albumId}`)
      .then((response) => {
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

// Can use for future spinner etc
function requestPlaylistHistory() {
  return {
    type: REQUEST_PLAYLIST_HISTORY,
  }
}

/**
 * For saving any card clicks to playlist history, for population of DetailView side nav items.
 * Includes album cards, category (playlist) cards etc.
 * When a track is played, this also triggers an immediate update to the DetailContainer side nav
 */
function savePlaylistSelection(playlistType, id, name) {
  return (dispatch) => {
    axios.post(`/app/save/playlist-selection?itemType=${playlistType}&itemId=${id}&itemName=${name}`)
      .then((response) => {
        dispatch(fetchPlaylistHistory()); // repopulate the DetailContainer sidenav listing on play clicks
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/**
 * Get user playlist selection history from the database
 * @return {Array} An array of { name, id } objects user previously selected for playing
 */
function fetchPlaylistHistory() { console.log('fetchPlaylistHistory running...');
  return (dispatch) => {
    dispatch(requestPlaylistHistory());

    axios.get('/playlist/history')
      .then((response) => {
        dispatch(receivePlaylistHistory(response.data.playlistHistoryArr));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function receivePlaylistHistory(playlistHistoryArr) {
  return {
    type: RECEIVE_PLAYLIST_HISTORY,
    playlistHistoryArr,
  }
}

export default {
  requestPlaylist,
  fetchPlaylist,
  receivePlaylist,
  requestAlbumDetail,
  fetchAlbum,
  receiveAlbum,
  requestPlaylistHistory,
  savePlaylistSelection,
  fetchPlaylistHistory,
  receivePlaylistHistory,
};