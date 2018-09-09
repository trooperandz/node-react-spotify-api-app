/**
 * All /playlist routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatTrackDuration } = require('../controllers/util');
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
    console.log('body response for playlist fetch: ', body);
    const parsedResponse = JSON.parse(body);
    const {
      images,
      description: playlistDescription,
      followers: { total: playlistFollowers },
      name: playlistName,
      tracks: { items: tracks },
    } = parsedResponse;

    // Put array objects in usable form
    const trackArr = tracks.reduce((returnArr, { track }) => {
      const {
        id: trackId,
        track_number: trackNumber,
        name: trackName,
        album: { name: albumName, href: albumHref },
        artists,
        duration_ms: duration,
        href: trackHref
      } = track;

      const formattedDuration = formatTrackDuration(duration);

      const trackObj = {
        trackId,
        trackName,
        trackNumber,
        trackHref,
        albumName,
        albumHref,
        trackDuration: formattedDuration,
        artistName: artists[0].name,
        artistHref: artists[0].href,
      };

      returnArr.push(trackObj);

      return returnArr;
    }, []);

    const playlistObj = {
      playlistName,
      playlistDescription,
      playlistFollowers,
      trackArr,
      playlistImgUrl: images[0].url,
    };

    return res.json({ success: true, playlist: playlistObj });
  });
});

module.exports = router;