/**
 * All /search routes
 */

const express = require('express');
const request = require('request');

const { SPOTIFY_BASE_URL } = require('../lib/constants/login');
const { formatAlbumCards, getUserSearchHistory, saveSearchTerm } = require('../controllers/util');
const router = express.Router();

// Retrieve search results (note:  all type params === album for now)
router.get('/', (req,res) => {
  const { q: query, type } = req.query;
  const { accessToken } = req.session;
  // console.log('\n\n\n hit search endpoint; q = ', query, ' type = ', type, '\n\n\n');
  const options = {
    url: `${SPOTIFY_BASE_URL}/search?q=${query}&type=${type}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log('error: ', err);
      return res.json({ success: false, error: err });
    }
    // console.log('\n\n\nbody response for search fetch: ', body, '\n\n\n');
    const parsedResponse = JSON.parse(body);
    const { albums: { items } = {} } = parsedResponse;
    const formattedSearchResultsArr = formatAlbumCards(items);

    return res.json({ success: true, searchResultsArr: formattedSearchResultsArr });
  });
});

/**
 * Get user search history from the database
 * @return {Object} Object containing { success, error, searchArr }
 */
router.get('/history', async (req, res) => {
  const searchHistory = await getUserSearchHistory();

  return res.json(searchHistory);
});

/**
 * When a user clicks on a search result album, save the search term in the db for side nav
 * history population
 */
router.post('/save', async (req, res) => {
  const { searchTerm } = req.query;
  const { success, error, result } = await saveSearchTerm(searchTerm);

  if (!success) {
    console.log('Error occurred while saving search term: ', error);
  }

  // Even a query error doesn't warrant sending a bad response; just catch in logging
  res.sendStatus(200);
});

module.exports = router;