/**
 * All /playlist routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const router = express.Router();

// Get a category's playlist tracks for the detail view
router.get('/', (req, res) => {
  const { userId, playlistId } = req.query;
  const { accessToken } = req.session;
  console.log('accessToken in /playlist: ', accessToken);
  const options = {
    url: `${SPOTIFY_BASE_URL}/users/${userId}/playlists/${playlistId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }
    // console.log('body response for playlist fetch: ', body);
    const parsedResponse = JSON.parse(body);
    const {
      images,
      description: playlistDescription,
      followers: { total: playlistFollowers },
      name: playlistName,
      tracks: { items: tracks },
    } = parsedResponse;
    const playlistObj = { playlistName, playlistDescription, playlistFollowers, playlistImgUrl: images[0].url, tracks };
    return res.json({ success: true, playlist: playlistObj });
  });
});

module.exports = router;