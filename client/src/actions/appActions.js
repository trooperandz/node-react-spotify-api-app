/**
 * App-wide shared, agnostic actions
 */

import axios from 'axios';

import {
  FETCH_ACCESS_TOKEN,
  RECEIVE_ACCESS_TOKEN,
  RECEIVE_DEVICE_ID,
  RECEIVE_PLAYBACK_STATE,
  RECEIVE_PLAYER_STATE,
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

/**
 * Save the Spotify access token on token refresh action
 */
function receiveAccessToken(accessToken) {
  console.log('receiveAccessToken ran, accessToken = ', accessToken);
  return {
    type: RECEIVE_ACCESS_TOKEN,
    accessToken,
  };
}

/**
 * Save device id to global store on Spotify player initialization
 */
function receiveDeviceId(deviceId) {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_DEVICE_ID,
      deviceId,
    })
  };
}

/**
 * All play icon clicks, also triggers an update to the playerState object
 */
function handlePlayClick(deviceId, trackUri) {
  console.log('handlePlayClick in appActions executed, deviceId = ', deviceId, ' trackUri = ', trackUri);
  playSpotifyTrack(deviceId, trackUri);
}

/**
 * All pause icon clicks, also triggers an update to the playerState object
 */
function handlePauseClick() {
  console.log('handlePauseClick in appActions executed...');
  pauseSpotifyTrack();
}

/**
 * Execute the Spotify SDK track play instruction
 */
function playSpotifyTrack(deviceId, trackUri) {
  let didParamsPass = true;
  console.log('playSpotifyTrack run instruction executing...,  deviceId: ', deviceId, ' trackUri: ', trackUri);

  if (!deviceId) {
    console.log('deviceId in playSpotifyTrack not set...');
    didParamsPass = false;
  }

  if (!trackUri) {
    console.log('trackUri in playSpotifyTrack not set...');
    didParamsPass = false;
  }

  if (!didParamsPass) {
    console.log('Params in playSpotifyTrack invalid...');
    return;
  }

  return (dispatch) => {
    axios.post(`/app/play?deviceId=${deviceId}&trackUri=${trackUri}`)
      .then((response) => {
        console.log(response);
        fetchPlaybackState(); // Now get playback status for health check
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/**
 * Execute the Spotify SDK track pause instruction
 */
function pauseSpotifyTrack() {
  return (dispatch) => {
    axios.post('/app/pause')
      .then((response) => {
        console.log(response);
        fetchPlaybackState(); // Now get playback status for health check
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/**
 * Get playback state information for the currently active device.
 * Executes immediately after play instruction.
 */
function fetchPlaybackState() { console.log('fetchPlaybackState fired...');
  return (dispatch) => {
    axios.get('/app/playback-state')
      .then((response) => {
        console.log(' playbackState: ', response.data.playbackState);
        dispatch(receivePlaybackState(response.data.playbackState));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/**
 * Save playback state object for future play actions; fires every time a play action occurs.
 * This info takes a bit of time to come back, so we use the SKD player state below for most resume
 * actions for track progress etc.
 */
function receivePlaybackState(playbackState) { console.log('receivePlaybackState action fired...');
  return {
    type: RECEIVE_PLAYBACK_STATE,
    playbackState,
  };
}


/**
 * Save the Spotify SDK player state on every 'player_state_changed' event.
 * Used for resuming paused play etc.
 * Not to be confused with playback state, which has its own call to the Spotify api.
 */
function savePlayerState(playerState) {
  return {
    type: RECEIVE_PLAYER_STATE,
    playerState,
  };
}

/**
 * Get a list of available devices
 */
function fetchDeviceList() {
  return (dispatch) => {
    axios.get('/app/device-list')
      .then((response) => {
        console.log('devices: ', response.data.devices);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function testAccess(accessToken) {
  return (dispatch) => {
    axios.post(`https://api.spotify.com/v1/me/browse/categories/37i9dQZF1DX21bRPJuEN7r/playlists`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('test response: ', response);
      })
      .catch((error) => {
        console.log('test error: ', error);
      })
  };
}

export default {
  savePlaylistSelection,
  fetchAccessToken,
  receiveDeviceId,
  handlePlayClick,
  handlePauseClick,
  playSpotifyTrack,
  pauseSpotifyTrack,
  fetchPlaybackState,
  receivePlaybackState,
  savePlayerState,
  fetchDeviceList,
  testAccess,
};