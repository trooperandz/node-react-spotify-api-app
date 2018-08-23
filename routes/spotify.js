const express = require('express');
const request = require('request');

const router = express.Router();
const { SPOTIFY_BASE_URL } = require('../lib/constants/login');

/**
 * Send & receive the request for new releases.
 * If country code param provided, add that to the request.
 * Extract the album array from the response and send to the front-end.
 */
router.get('/new-releases', (req, res) => {
  const accessToken = req.session.accessToken;
  console.log('accessToken in /new-releases: ', accessToken);
  console.log('req.session in /new-releases: ', req.session);
  const { countryCode } = req.query;
  let countryCodeParam = '';
  if (countryCode) countryCodeParam = `country=${countryCode}`;
  const options = {
    url: `${SPOTIFY_BASE_URL}/browse/new-releases?${countryCodeParam}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err});
    }

    const parsedResponse = JSON.parse(body);
    if (parsedResponse) {
      const { albums: { items: albumArr = {} } = {} } = parsedResponse;
      return res.json({ success: true, albumArr });
    } else {
      return res.json({ success: true, albumArr: [] });
    }
  });
});

// Get a playlist from a provided category
router.get('/categories', (req, res) => {
  const { categoryId } = req.query;
  const accessToken = req.session.accessToken;
  console.log('accessToken in /categories: ', accessToken);
  const options = {
    url: `${SPOTIFY_BASE_URL}/browse/categories/${categoryId}/playlists`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    const parsedResponse = JSON.parse(body);
    const { playlists: { items: categoriesArr = {} } } = parsedResponse;

    return res.json({ success: true, categoriesArr });
  });
});

// Get a playlists's tracks for the album view
// test: spotify, 37i9dQZF1DX7YCknf2jT6s
router.get('/playlist', (req, res) => {
  const { userId, playlistId } = req.query;
  const accessToken = req.session.accessToken;
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
    } = parsedResponse
    const playlistObj = { playlistName, playlistDescription, playlistFollowers, playlistImgUrl: images[0].url, tracks };
    return res.json({ success: true, playlist: playlistObj });
  });
});

module.exports = router;