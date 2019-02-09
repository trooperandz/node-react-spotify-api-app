/**
 * App-wide routes, container-agnostic (root /app).
 * Contains mostly player-related routes.
 */

const express = require('express');
const request = require('request');
const queryString = require('query-string');

const { savePlaylistSelection } = require('../controllers/util');
const { refreshExpiredToken } = require('../middleware');
const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const router = express.Router();

// Saves any category/album card click history for viewing in DetailView side nav
router.post(`/save/playlist-selection`, async (req, res) => {
  const { itemType, itemId, itemName } = req.query;

  if (!itemType) console.log('itemType not provided...');
  if (!itemId) console.log('itemId not provided...');
  if (!itemName) console.log('itemName not provided...');

  const { success, error, result } = await savePlaylistSelection(itemType, itemId, itemName);

  if (!success) {
    console.log('Error occurred while saving playlist selection: ', error);
  }

  // Even a query error doesn't warrant sending a bad response; just catch in logging
  return res.sendStatus(200);
});

// Provide the access token to the app (client-side), for the Spotify player SDK connection
router.get('/access-token', refreshExpiredToken, (req, res) => {
  const { accessToken } = req.session;
  console.log('/app/access-token route executed...');

  if (!accessToken) {
    return res.json({ success: false, error: 'There is no active accessToken session var' });
  } else {
    return res.json({ sucess: true, accessToken });
  }
});

// Execute a play instruction for the active device
router.post('/play', refreshExpiredToken, (req, res) => {
  const { accessToken } = req.session;
  const { deviceId, positionMs, trackOffset } = req.query;
  const { context } = req.body; // We pass context as a body request bc it's an array

  if (!deviceId) {
    console.log('deviceId in /play undefined...');
  }

  if (!context) {
    console.log('context in /play undefined...');
  }

  let requestBody = {
    uris: context,
  };

  if (positionMs) requestBody.position_ms = positionMs;
  if (trackOffset) requestBody.offset = { position: trackOffset};

  request({
    method: 'PUT',
    url: `${SPOTIFY_BASE_URL}/me/player/play?device_id=${deviceId}`,
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  }, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    // console.log('response: ', response);
    return res.json({ success: true, response });
  });
});

// Pause the player playback
router.post('/pause', refreshExpiredToken, (req, res) => { console.log('/app/pause route executed...')
  const { accessToken } = req.session;

  const options = {
    url: `${SPOTIFY_BASE_URL}/me/player/pause`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.put(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    return res.json({ success: true });
  });
});

// Get information about the current playback state (can help troubleshoot device status etc)
router.get('/playback-state', refreshExpiredToken, (req, res) => { console.log('/playback-state executing...');
  const { accessToken } = req.session;

  if (!accessToken) {
    console.log('accessToken invalid in /playback-state request...');
  }

  const options = {
    url: `${SPOTIFY_BASE_URL}/me/player`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    const parsedResponse = (body ? JSON.parse(body) : response);

    return res.json({ success: true, playbackState: parsedResponse });
  });
});

// Get information about all active devices
router.get('/device-list', refreshExpiredToken, (req, res) => { console.log('/playback-state executing...');
  const { accessToken } = req.session;

  if (!accessToken) {
    console.log('accessToken invalid in /device-list request...');
  }

  const options = {
    url: `${SPOTIFY_BASE_URL}/me/player/devices`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    const parsedResponse = JSON.parse(body);
    const { devices } = parsedResponse;

    console.log('response for /device-list: ', devices);
    return res.json({ success: true, devices });
  });
});

// Skip to next track
router.post('/player/next', refreshExpiredToken, (req, res) => {
  console.log('fetching next');
  const { accessToken } = req.session;
  const { deviceId } = req.query;

  if (!accessToken) {
    console.log('accessToken invalid in /player/next request...');
  }

  if (!deviceId) {
    console.log('deviceId in /player/next is null...');
  }

  const options = {
    url: `${SPOTIFY_BASE_URL}/me/player/next?device_id=${deviceId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.post(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    console.log('response for /player/next: ', response);
    return res.json({ success: true });
  });
});

// Skip to previous track
router.post('/player/previous', refreshExpiredToken, (req, res) => {
  console.log('fetching previous');
  const { accessToken } = req.session;
  const { deviceId } = req.query;

  if (!accessToken) {
    console.log('accessToken invalid in /player/previous request...');
  }

  if (!deviceId) {
    console.log('deviceId in /player/previous is null...');
  }

  const options = {
    url: `${SPOTIFY_BASE_URL}/me/player/previous?device_id=${deviceId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.post(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    console.log('response for /player/previous: ', response);
    return res.json({ success: true });
  });
});

module.exports = router;