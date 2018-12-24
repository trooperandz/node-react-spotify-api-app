/**
 * App-wide routes, container-agnostic (root /app)
 */

const express = require('express');
const request = require('request');

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
  const { deviceId, trackUri } = req.query;
  console.log('deviceId: ', deviceId, ' trackUri: ', trackUri);
  if (!deviceId) {
    console.log('deviceId in /play undefined...');
  }

  if (!trackUri) {
    console.log('trackUri in /play undefined...');
  }

  request({
    method: 'PUT',
    url: `${SPOTIFY_BASE_URL}/me/player/play?device_id=${deviceId}`,
    body: JSON.stringify({ uris: [trackUri] }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  }, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    console.log('response: ', response);
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

    // const parsedResponse = JSON.parse(body);
    const parsedResponse = (body ? JSON.parse(body) : response);
    // console.log('response for /playback-state: ', response);
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

module.exports = router;