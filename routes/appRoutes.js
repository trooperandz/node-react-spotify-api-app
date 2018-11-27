/**
 * App-wide routes, container-agnostic (root /app)
 */

const express = require('express');

const { savePlaylistSelection } = require('../controllers/util');
const { refreshExpiredToken } = require('../middleware');
const router = express.Router();

// Saves any category/album card click history for viewing in DetailView side nav
router.post(`/save/playlist-selection`, async (req, res) => {
  const { itemType, itemId, itemName } = req.query;

  if (!itemType) console.log('itemType not provided...');
  if (!itemId) console.log('itemId not provided...');
  if (!itemName) console.log('itemName not provided...');

  const { success, error, result } = await savePlaylistSelection(itemType, itemId, itemName);

  if (!success) {
    console.log('Error occurred while saving playlist selection: ', error);
  }

  // Even a query error doesn't warrant sending a bad response; just catch in logging
  return res.sendStatus(200);
});

// Provide the access token to the app (client-side), for the Spotify player SDK connection
router.get('/access-token', refreshExpiredToken, (req, res) => {
  const { accessToken } = req.session;
  console.log('/app/access-token route executed...');

  if (!accessToken) {
    return res.json({ success: false, error: 'There is no active accessToken session var' });
  } else {
    return res.json({ sucess: true, accessToken });
  }
});

module.exports = router;