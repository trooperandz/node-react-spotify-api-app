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
  const options = {
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
    const { albums: { items: albumArr = {} } } = parsedResponse;
    return res.json({ success: true, albumArr });
  });
});

router.get('/categories', (req, res) => {
  console.log('hit categories endpoint...');
  const accessToken = req.session.accessToken;
  const options = {
    url: 'https://api.spotify.com/v1/browse/categories',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }

    const parsedResponse = JSON.parse(body);
    console.log('parsedResponse: ', parsedResponse);
    const { categories: { items: categoriesArr = {} } } = parsedResponse;
    return res.json({ success: true, categoriesArr });
  });
});

module.exports = router;