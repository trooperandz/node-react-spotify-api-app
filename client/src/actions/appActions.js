/* App-wide shared, agnostic actions */

import axios from 'axios';

/**
 * For saving any card clicks to playlist history, for population of DetailView side nav items.
 * Includes album cards, category (playlist) cards etc.
 * No action type necessary, as we don't need to update state for this action. The side nav
 * repopulates itself on every new component mount.
 */
function savePlaylistSelection(playlistType, id, name) {
  return (dispatch) => {
    axios.post(`/app/save/playlist-selection?itemType=${playlistType}&itemId=${id}&itemName=${name}`)
      .then((response) => {
        // no-op
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default {
  savePlaylistSelection,
};