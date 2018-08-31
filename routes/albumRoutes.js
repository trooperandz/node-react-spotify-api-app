/**
 * All /album routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const router = express.Router();

// Get an albums's tracks etc for the detail view
router.get('/', (req, res) => {
  const { albumId } = req.query;
  const { accessToken } = req.session;
  console.log('accessToken in /album: ', accessToken);
  const options = {
    url: `${SPOTIFY_BASE_URL}/album/${albumId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }
    console.log('body response for album fetch: ', body);
    const parsedResponse = JSON.parse(body);

    const {
      images,
      artists,
      copyrights,
      id: albumId,
      name: playlistName,
      release_date: releaseDate,
      tracks: { items: tracks },
    } = parsedResponse;

    const albumObj = {
      playlistName,
      tracks,
      playlistDescription: `${artists[0].name} - Released in ${releaseDate}`,
      playlistFollowers: `${tracks.length} songs`,
      playlistImgUrl: images[1].url,
      artistLink: artists[0].href,
    };

    return res.json({ success: true, albumObj });
  });
});

module.exports = router;