/**
 * All controller functions for album routes
 */

 const moment = require('moment');

 const { formatTrackDuration, safeParseJSON } = require('./util');

/**
 * Take the api album response and format it into a nice "playlist" object for the detail view
 */
function formatPlaylistObj(body) {
  const parsedResponse = safeParseJSON(body);

  // Safely return an empty object if we don't get what we need
  if (!parsedResponse.hasOwnProperty('tracks')) {
    console.log('Album response did not contain the required values...');
    return {};
  }

  const {
    images,
    artists,
    copyrights,
    id: albumId,
    name: playlistName, // just for consistency (we use playlistName for playlists too)
    release_date: releaseDate,
    tracks: { items: tracks },
    uri: contextUri, // uri context for player SDK i.e. "spotify:album", "spotify:user:spotify:playlist" etc
  } = parsedResponse;

  // Used for recording play click history
  const playlistType = 'album';
  let trackUriArr = [];

  const trackArr = tracks.reduce((returnArr, track) => {
    const {
      id: trackId,
      name: trackName,
      track_number: trackNumber,
      href: trackHref, // provides full track details
      uri: trackUri, // actual track uri play location (use with Spotify player SDK)
      duration_ms: duration,
    } = track;

    const formattedDuration = formatTrackDuration(duration);

    const trackObj = {
      albumId,
      playlistType,
      playlistName,
      trackId,
      trackName,
      trackNumber,
      trackHref,
      trackUri,
      albumName: playlistName,
      trackDuration: formattedDuration,
      artistName: artists[0].name,
      artistHref: artists[0].href,
    };

    trackUriArr.push(trackUri);
    returnArr.push(trackObj);

    return returnArr;
  }, []);

  const playlistObj = {
    albumId,
    playlistType,
    playlistName,
    trackArr,
    trackUriArr,
    contextUri,
    playlistDescription: `${artists[0].name} - Released ${moment(releaseDate).format('LL')}`,
    playlistFollowers: `${tracks.length} songs`,
    playlistImgUrl: images[1].url,
    artistHref: artists[0].href,
  };

  return playlistObj;
}

module.exports = {
  formatPlaylistObj,
}