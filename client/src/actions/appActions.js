/**
 * App-wide shared, agnostic actions
 */

import axios from 'axios';
import queryString from 'query-string';

import {
  FETCH_ACCESS_TOKEN,
  RECEIVE_ACCESS_TOKEN,
  RECEIVE_DEVICE_ID,
  RECEIVE_PLAYBACK_STATE,
  RECEIVE_PLAYER_STATE,
  RECEIVE_PLAYED_PLAYER_STATE,
} from './actionTypes';

/**
 * For saving any card clicks to playlist history, for population of DetailView side nav items.
 * Includes album cards, category (playlist) cards etc.
 * No action type necessary, as we don't need to update state for this action. The side nav
 * repopulates itself on every new component mount.
 * TODO: update so that sidenave array state is updated (we are moving this save to play clicks, not ablum/playlist clicks)
 */
function savePlaylistSelection(playlistType, id, name) { console.log('savePlaylistSelection running... playlistType = ', playlistType, ' id = ', id, ' name = ', name);
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
 * TODO: is this being used?  If so, standardize so that it's used everywhere instead of being
 * created in multiple components.
 */
function handlePlayClick(deviceId, trackUri) {
  playSpotifyTrack(deviceId, trackUri);
}

/**
 * All pause icon clicks, also triggers an update to the playerState object.
 * We save a separate paused player state object for resuming playback.
 * TODO: is this being used?  If so, standardize so that it's used everywhere instead of being
 * created in multiple components.
 */
function handlePauseClick(playerState) {
  pauseSpotifyTrack(playerState);
}

/**
 * Execute the Spotify SDK track play instruction
 */
function playSpotifyTrack(deviceId, context, resumePositionMs, trackOffset, playlistObj) {
  let didParamsPass = true;

  if (!deviceId) {
    console.log('deviceId in playSpotifyTrack not set...');
    didParamsPass = false;
  }

  if (!context) {
    console.log('context in playSpotifyTrack not set...');
    didParamsPass = false;
  }

  if (!didParamsPass) {
    console.log('Params in playSpotifyTrack invalid...');
    return;
  }

  let params = `?deviceId=${deviceId}`;

  // Present after a pause event
  if (resumePositionMs) params += `&positionMs=${resumePositionMs}`;

  // Present for TrackTableRow play click; we trackUriArr is provided for every track play
  if (trackOffset) params += `&trackOffset=${trackOffset}`;

  return (dispatch) => {
    axios.post(`/app/play${params}`, { context })
      .then((response) => {
        // Save For resuming PlayControlContainer play; we use trackUriArr and offset for plays,
        // and also use data from this saved playlistOb for the PlayControlContainer.
        dispatch(savePlayedPlayerState({ context, trackOffset, playlistObj }));

        // Now fetch playback status for health check
        fetchPlaybackState();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/**
 * Execute the Spotify SDK track pause instruction
 */
function pauseSpotifyTrack(playerState) {
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
function fetchPlaybackState() {
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
 * This is advised by the Spotify docs to be used as a status "health check".
 */
function receivePlaybackState(playbackState) {
  return {
    type: RECEIVE_PLAYBACK_STATE,
    playbackState,
  };
}


/**
 * Save the Spotify SDK player state on every 'player_state_changed' event.
 * Used for resuming paused play etc.
 * Not to be confused with playback state, which has its own call to the Spotify api, nor the
 * pausedPlayerState, which saves the status on a pause action for future resume etc.
 */
function savePlayerState(playerState) {
  return {
    type: RECEIVE_PLAYER_STATE,
    playerState,
  };
}

/**
 * Executed on every play click, to save previously played track.
 * Used for passing data to PlayControlContainer, which is at the App root level.
 * PlayControlContainer needs the entire previous trackUriArr and the array offset for resuming play.
 */
function savePlayedPlayerState(playedPlayerState) {
  return {
    type: RECEIVE_PLAYED_PLAYER_STATE,
    playedPlayerState,
  }
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

/**
 * Proceed to the next album or playlist track.
 * Causes an update in the connected playerState; no action necessary.
 * TODO: save player state similar to how we do in playSpotifyTrack() so we can resume from this control
 */
function fetchNextTrack(deviceId) {
  return () => {
    axios.post(`/app/player/next?deviceId=${deviceId}`)
      .then((response) => {
        /* no-op */
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/**
 * Skip to the previous album or playlist track.
 * Causes an update in the connected playerState; no action necessary.
 * TODO: save player state similar to how we do in playSpotifyTrack() so we can resume from this control
 */
function fetchPreviousTrack(deviceId) {
  return () => {
    axios.post(`/app/player/previous?deviceId=${deviceId}`)
      .then((response) => {
        /* no-op */
      })
      .catch((error) => {
        console.log(error);
      });
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
  fetchNextTrack,
  fetchPreviousTrack,
};