/**
 * All /new-releases routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatAlbumCards } = require('../controllers/util');
const router = express.Router();

// Get a list of new release albums by country code
router.get('/', (req, res) => {
  const { accessToken } = req.session;
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

    const parsedResponse = JSON.parse(body); console.log('parsedResponse in /new-releases: ', parsedResponse);
    if (parsedResponse) {
      const { albums: { items } = {} } = parsedResponse;
      const albumArr = formatAlbumCards(items);

      return res.json({ success: true, albumArr });
    } else {
      return res.json({ success: true, albumArr: [] });
    }
  });
});

module.exports = router;