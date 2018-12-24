/**
 * All /album routes
 */

const express = require('express');
const request = require('request');

const { refreshExpiredToken } = require('../middleware');
const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatPlaylistObj } = require('../controllers/albumController');
const router = express.Router();

// Get an albums's tracks etc for the detail view
router.get('/', refreshExpiredToken, (req, res) => {
  const { albumId } = req.query;
  const { accessToken } = req.session;

  const options = {
    url: `${SPOTIFY_BASE_URL}/albums/${albumId}`,
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

    return res.json({ success: true, playlistObj });
  });
});

module.exports = router;