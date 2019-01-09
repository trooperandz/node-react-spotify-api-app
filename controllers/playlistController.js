/**
 * All controller functions for playlist routes
 */
 const { formatTrackDuration, safeParseJSON } = require('./util');

 /**
 * Take the api playlist response and format it into a nice "playlist" object for the detail view
 * TODO: make this and the album function share the same util if possible (all items may be identical)
 */
function formatPlaylistObj(body) {
  const parsedResponse = safeParseJSON(body);

  // Safely return an empty object if we don't get what we need
  if (!parsedResponse.hasOwnProperty('tracks')) {
    console.log('Playlist response did not contain the required values...');
    return {};
  }

  const {
    images,
    description: playlistDescription,
    followers: { total: playlistFollowers },
    name: playlistName,
    tracks: { items: tracks },
    uri: contextUri,
  } = parsedResponse;

  let trackUriArr = [];

  // Put array objects in usable form
  const trackArr = tracks.reduce((returnArr, { track }) => {
    const {
      artists,
      id: trackId,
      track_number: trackNumber,
      name: trackName,
      album: { name: albumName, href: albumHref },
      duration_ms: duration,
      href: trackHref,
      uri: trackUri,
    } = track;

    const formattedDuration = formatTrackDuration(duration);

    const trackObj = {
      trackId,
      trackName,
      trackNumber,
      trackHref,
      trackUri,
      albumName,
      albumHref,
      trackDuration: formattedDuration,
      artistName: artists[0].name,
      artistHref: artists[0].href,
    };

    trackUriArr.push(trackUri);
    returnArr.push(trackObj);

    return returnArr;
  }, []);

  const playlistObj = {
    playlistName,
    playlistDescription,
    playlistFollowers,
    trackArr,
    trackUriArr,
    contextUri,
    playlistImgUrl: images[0].url,
  };

  return playlistObj;
}

module.exports = {
  formatPlaylistObj,
};