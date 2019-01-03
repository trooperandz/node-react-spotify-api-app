// Refer to a list of all possible actions
export const REQUEST_NEW_RELEASES = 'REQUEST_NEW_RELEASES';
export const FETCH_NEW_RELEASES = 'FETCH_NEW_RELEASES';
export const RECEIVE_NEW_RELEASES = 'RECEIVE_NEW_RELEASES';
export const SET_COUNTRY_ID = 'SET_COUNTRY_ID';

export const REQUEST_ALBUM_DETAIL = 'REQUEST_ALBUM_DETAIL';
export const FETCH_ALBUM = 'FETCH_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CATEGORY_ID = 'SET_CATEGORY_ID';

export const FETCH_PLAYLIST = 'FETCH_PLAYLIST';
export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const REQUEST_PLAYLIST_HISTORY = 'FETCH_PLAYLIST_HISTORY';
export const RECEIVE_PLAYLIST_HISTORY = 'RECEIVE_PLAYLIST_HISTORY';

export const REQUEST_SEARCH_HISTORY = 'REQUEST_SEARCH_HISTORY';
export const FETCH_SEARCH_HISTORY = 'FETCH_SEARCH_HISTORY';
export const RECEIVE_SEARCH_HISTORY = 'RECEIVE_SEARCH_HISTORY';
export const FETCH_SEARCH_TERM = 'FETCH_SEARCH_TERM';
export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

// Keep the Spotify access token updated for the Spotify playback SDK access
export const FETCH_ACCESS_TOKEN = 'FETCH_ACCESS_TOKEN';
export const RECEIVE_ACCESS_TOKEN = 'RECEIVE_ACCESS_TOKEN';

// Save Spotify player device id to global store after SpotifyPlayer connection initialization
export const RECEIVE_DEVICE_ID = 'RECEIVE_DEVICE_ID';

// Save playback state for future play actions (i.e. resume play after pause action)
export const RECEIVE_PLAYBACK_STATE = 'RECEIVE_PLAYBACK_STATE';

// Save the Spotify SDK player state (not to be confused with playback state)
export const RECEIVE_PLAYER_STATE = 'RECEIVE_PLAYER_STATE';

// Save last played item data for PlayControlContainer context
export const RECEIVE_PLAYED_PLAYER_STATE = 'RECEIVE_PLAYED_PLAYER_STATE';