const express = require('express');
const request = require('request');

const router = express.Router();

/**
 * Send & receive the request for new releases.
 * Extract the album array from the response and send to the front-end.
 */
router.get('/new-releases', (req, res) => {
  const accessToken = req.session.accessToken; console.log('accessToken: ', accessToken);
  const countryCodeParam = 'country=SE';
  var options = {
    url: `https://api.spotify.com/v1/browse/new-releases?${countryCodeParam}`,
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
    const { albums: { items: albumArr } } = parsedResponse;
    return res.json({ success: true, albumArr });
  });
});

module.exports = router;