/**
 * All /categories routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatCategoryCards } = require('../controllers/util');
const router = express.Router();

// Get a list of spotify playlists within a given category
router.get('/', (req, res) => {
  const { categoryId } = req.query;
  const { accessToken } = req.session;
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
    const { playlists: { items: categoriesArr = [] } } = parsedResponse;
    const formattedPlaylistCardArr = formatCategoryCards(categoriesArr);

    return res.json({ success: true, categoriesArr: formattedPlaylistCardArr });
  });
});

module.exports = router;