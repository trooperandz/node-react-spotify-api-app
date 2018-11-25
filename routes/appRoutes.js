/**
 * App-wide routes, container-agnostic (root /app)
 */

const express = require('express');

const { savePlaylistSelection } = require('../controllers/util');
const router = express.Router();

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
  res.sendStatus(200);
});

module.exports = router;