/**
 * All /album routes
 */

const express = require('express');
const request = require('request');

const { refreshExpiredToken } = require('../middleware');
const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatTrackDuration } = require('../controllers/util');
const router = express.Router();

// Get an albums's tracks etc for the detail view
router.get('/', refreshExpiredToken, (req, res) => {
  const { albumId } = req.query;
  const { accessToken } = req.session;
  console.log('accessToken in /album: ', accessToken);
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

    const parsedResponse = JSON.parse(body);
    // console.log('body response for album fetch: ', body);
    const {
      images,
      artists,
      copyrights,
      id: albumId,
      name: playlistName, // just for consistency (we use playlistName for playlists too)
      release_date: releaseDate,
      tracks: { items: tracks },
    } = parsedResponse;

    const trackArr = tracks.reduce((returnArr, track) => {
      const {
        id: trackId,
        name: trackName,
        track_number: trackNumber,
        href: trackHref,
        duration_ms: duration,
      } = track;

      const formattedDuration = formatTrackDuration(duration);

      const trackObj = {
        trackId,
        trackName,
        trackNumber,
        trackHref,
        albumName: playlistName,
        trackDuration: formattedDuration,
        artistName: artists[0].name,
        artistHref: artists[0].href,
      };

      returnArr.push(trackObj);

      return returnArr;
    }, []);

    const playlistObj = {
      playlistName,
      trackArr,
      playlistDescription: `${artists[0].name} - Released in ${releaseDate}`,
      playlistFollowers: `${tracks.length} songs`,
      playlistImgUrl: images[1].url,
      artistHref: artists[0].href,
    };

    return res.json({ success: true, playlistObj });
  });
});

module.exports = router;