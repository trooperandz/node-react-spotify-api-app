/**
 * All /playlist routes
 */

const express = require('express');
const request = require('request');

const { refreshExpiredToken } = require('../middleware');
const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { getPlaylistHistory } = require('../controllers/util');
const { formatPlaylistObj } = require('../controllers/playlistController');
const router = express.Router();

// Get a category's playlist tracks for the detail view
router.get('/', refreshExpiredToken, (req, res) => {
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

    const playlistObj = formatPlaylistObj(body);

    return res.json({ success: true, playlist: playlistObj });
  });
});

/**
 * Get user playlist history from the database
 * @return {Object} Object containing { success, error, playlistHistoryArr }
 */
router.get('/history', async (req, res) => {
  const playlistHistoryArr = await getPlaylistHistory();

  return res.json(playlistHistoryArr || {});
});

module.exports = router;