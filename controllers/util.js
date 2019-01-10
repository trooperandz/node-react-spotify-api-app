// Shared utility functions

const catchify = require('catchify');
const safeParse = require('safe-json-parse/callback');

const { SearchHistory, PlayHistory } = require('../models');

/**
 * Format the spotify album results for album cards displayed in CardContainer
 * @param {Array} albums An array of album objects
 * @return {Array} An array of formatted album objects
 */
function formatAlbumCards(albums) {
  const formattedAlbumCardArr = albums.reduce((arr, album) => {
    const {
      id: albumId,
      artists,
      name: albumName,
      images,
      release_date: releaseDate,
      href: albumHref,
    } = album;

    const albumObj = {
      albumId,
      artist: artists[0].name,
      albumName,
      imgUrl: images[1].url,
      releaseDate,
      albumHref,
    };

    arr.push(albumObj);

    return arr;
  }, []);

  return formattedAlbumCardArr;
}

/**
 * Format the spotify category results for playlist cards displayed in CardContainer
 * @param {Array} albums An array of category (playlist) objects
 * @return {Array} An array of formatted category (playlist) objects
 */
function formatCategoryCards(categoriesArr) {
  const formattedCategoryCardArr = categoriesArr.reduce((arr, category) => {
    const {
      id: playlistId,
      name: playlistName,
      owner: { id: ownerId },
      images,
      href: categoryHref,
    } = category;

    const categoryObj = {
      playlistId,
      playlistName,
      ownerId,
      imgUrl: images[0].url,
      categoryHref,
    };

    arr.push(categoryObj);

    return arr;
  }, []);

  return formattedCategoryCardArr;
}

/**
 * Format the given duration (ms) for the track table view.
 * @param {int} The api duration response, in ms
 * @return {string} The string to diplay in the track table view.
 */
function formatTrackDuration(duration) {
  let formattedDuration = (duration/100000).toString().substring(0,4).replace('.', ':');

  return formattedDuration;
}

/**
 * Retrieve user search history from the database
 * @return {Array} An array of { name, id } objects from previous searches
 */
async function getUserSearchHistory() {
  const [err, searchHistoryArr] = await catchify(SearchHistory.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 25,
  }));

  if (err) {
    return { success: false, error: err };
  } else {
    const searchArr = searchHistoryArr.reduce((arr, searchItem) => {
      arr.push({
        name: searchItem.search_term,
        id: searchItem.search_type,
      });

      return arr;
    }, []);

    return { success: true, searchArr };
  }
}

/**
 * Save user search term when an album is clicked inside of the search results container.
 * @param {string} seachTerm The active search term.
 * @return
 */
async function saveSearchTerm(searchTerm) {
  const [err, [ searchHistory, created]] = await catchify(SearchHistory.findOrCreate({
    where: { search_term: searchTerm },
    defaults: { search_term: searchTerm, search_type: 'album' },
  }));

  if (err) {
    return { success: false, error: err };
  } else if (!created) {
    // Only way to JUST update the updatedAt field on instance save is to mark the field as "dirty"
    // We order by updatedAt so that the most recently searched items show in the side nav
    searchHistory.changed('updatedAt', true);

    const [err, saveResult] = await catchify(searchHistory.save());

    if (err) {
      console.log('Error on SearchHistories update: ', err);
      return { success: false, error: err };
    }

    return { success: true, result: saveResult };
  }

  // We don't use the searchHistory, but might need it in the future
  return { success: true, result: searchHistory };
}

/**
 * Save play history on any album/category etc. card click, for display in DetailView side nav
 * @param {string} itemType The type of card clicked (i.e. album, playlist)
 * @param {string} itemId The Spotify unique id
 * @param {string} itemName The album/playlist etc title
 */
async function savePlaylistSelection(itemType, itemId, itemName) {
  const [err, [ playHistory, created]] = await catchify(PlayHistory.findOrCreate({
    where: { item_id: itemId },
    defaults: { item_id: itemId, item_type: itemType, item_name: itemName },
  }));

  if (err) {
    console.log('Error on PlayHistory save: ', err);
    return { success: false, error: err };
  } else if (!created) {
    // Only way to update updatedAt value when it's the only change is to mark it as "dirty".
    // We populate the side nav by updatedAt order, so we have to update record for display
    playHistory.changed('updatedAt', true);
    const [err, saveResult] = await catchify(playHistory.save());

    if (err) {
      console.log('Error on playHistory save: ', err);
      return { success: false, error: err };
    }

    return { success: true, result: saveResult };
  }

  // We don't use the playHistory, but might need it in the future
  return { success: true, result: playHistory };
}

/**
 * Get user playlist history from the database for populating the DetailView side nav
 * @return {Object} Object containing { success, error, playlistHistoryArr }
 */
async function getPlaylistHistory() {
  const [err, playlistArr] = await catchify(PlayHistory.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 25,
  }));

  if (err) {
    return { success: false, error: err };
  } else {
    const playlistHistoryArr = playlistArr.reduce((arr, { item_id, item_name, item_type }) => {
      arr.push({
        id: item_id,
        name: item_name,
        itemType: item_type, // dictates correct album/playlist fetch action for DetailView side nav click
      });

      return arr;
    }, []);

    return { success: true, playlistHistoryArr };
  }
}

/**
 * Util for safely parsing JSON
 */
function safeParseJSON(body) {
  let parsedResponse;

  safeParse(body, (err, json) => {
    if (err) {
      console.log('JSON parse error...');
      parsedResponse = {};
    }

    parsedResponse = json;
  });

  return parsedResponse;
}

module.exports = {
  formatAlbumCards,
  formatCategoryCards,
  formatTrackDuration,
  getUserSearchHistory,
  saveSearchTerm,
  savePlaylistSelection,
  getPlaylistHistory,
  safeParseJSON,
};
