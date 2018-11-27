/* App-wide shared, agnostic actions */

import axios from 'axios';

import {
  FETCH_ACCESS_TOKEN,
  RECEIVE_ACCESS_TOKEN,
} from './actionTypes';

/**
 * For saving any card clicks to playlist history, for population of DetailView side nav items.
 * Includes album cards, category (playlist) cards etc.
 * No action type necessary, as we don't need to update state for this action. The side nav
 * repopulates itself on every new component mount.
 */
function savePlaylistSelection(playlistType, id, name) {
  return (dispatch) => {
    axios.post(`/app/save/playlist-selection?itemType=${playlistType}&itemId=${id}&itemName=${name}`)
      .then((response) => {
        // no-op
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/**
 * Update (troll) the access token for the spotify player SDK connection requirement
 */
function fetchAccessToken() {
  console.log('fetchAccessToken ran...');
  return (dispatch) => {
    axios.get('/app/access-token')
      .then((response) => {
        dispatch(receiveAccessToken(response.data.accessToken));
        // no-op
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function receiveAccessToken(accessToken) {
  console.log('receiveAccessToken ran, accessToken = ', accessToken);
  return {
    type: RECEIVE_ACCESS_TOKEN,
    accessToken,
  };
}

export default {
  savePlaylistSelection,
  fetchAccessToken,
};