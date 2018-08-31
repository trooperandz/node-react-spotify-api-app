// For detail container
import axios from 'axios';

import {
  FETCH_PLAYLIST,
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
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

export default {
  requestPlaylist,
  fetchPlaylist,
  receivePlaylist,
};