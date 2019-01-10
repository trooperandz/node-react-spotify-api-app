/**
 * Displays all info relating to specific album, playlist etc (track listings)
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import appActions from '../actions/appActions';
import playlistActions from '../actions/playlistActions';
import SideNav from '../components/SideNav';
import TrackTable from './TrackTable';
import PlayIconContainer from './PlayIconContainer';

class DetailContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePlayHistorySelect = this.handlePlayHistorySelect.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  componentDidMount() {
    const {
      playlistObj,
      playlistActions: {
        fetchPlaylistHistory,
        fetchPlaylist,
      } = {},
    } = this.props;

    // Fetch a default playlist that's pretty if none has been selected yet ("Jazzy Romance"!)
    if (playlistObj && !playlistObj.hasOwnProperty('trackArr')) {
      fetchPlaylist('spotify', '37i9dQZF1DWTbzY5gOVvKd');
    }

    fetchPlaylistHistory();
  }

  // Generate history to choose from for side nav...will come from the db
  getPlaylistHistory() {
    const { playlistHistoryArr } = this.props;

    if (!playlistHistoryArr.length) return [ { name: 'No history...', id: '' } ];

    return playlistHistoryArr;
  }

  // Begin new play or resume previously played album or playlist
  // TODO: clean up all these objects & consolidate some if you can...
  handlePlayClick(trackUriArr) {
    const {
      deviceId,
      playerState,
      playedPlayerState,
      playlistObj,
      appActions: { playSpotifyTrack },
    } = this.props;

    let currentTrackUriArr;
    let currentTrackOffset;
    let resumePositionMs;
    let playedAlbumUri;
    let viewedAlbumUri;

    // Represents the latest played item; grab the info for resuming play.
    // If no item has been played yet, we use the provided album or playlist uri array
    if (playedPlayerState && playedPlayerState.hasOwnProperty('context')) {
      const {
        context,
        trackOffset,
      } = playedPlayerState;

      currentTrackUriArr = context;
      currentTrackOffset = trackOffset;
    }

    // If we have an active player state, determine paused state & save our resume position
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        paused,
        position,
        track_window: {
          current_track: {
            uri: currentTrackUri,
            album: { uri: albumUri } = {},
          } = {},
        },
      } = playerState;

      playedAlbumUri = albumUri;

      if (paused) {
        resumePositionMs = position;
      }
    }

    // Represents the most recent album or playlist selection in DetailContainer; the play icon
    // here needs to play the "newly" displayed album if it's different than the last played one
    if (playlistObj && playlistObj.hasOwnProperty('contextUri')) {
      const { contextUri } = playlistObj;

      viewedAlbumUri = contextUri;
    }

    if (playedAlbumUri !== viewedAlbumUri) {
      currentTrackUriArr = trackUriArr; // same as the one in playlistObj, it's just passed...
      resumePositionMs = null;
      currentTrackOffset = null;
    }

    playSpotifyTrack(deviceId, currentTrackUriArr, resumePositionMs, currentTrackOffset, playlistObj);
  }

  // Pause play and save the currently active player state
  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  // Process side nav click action; determine relevant action by item type
  // (we don't need selectedSidenavObj here btw)
  handlePlayHistorySelect(itemId, selectedSidenavObj, itemType) {
    const { playlistActions: { fetchAlbum, fetchPlaylist } } = this.props;

    if (itemType === 'playlist') {
      fetchPlaylist('spotify', itemId); // current version returns only Spotify-procured playlists
    } else if (itemType === 'album') {
      fetchAlbum(itemId);
    }
  }

  // Render image and tracks if playlistObj available; otherwise return default message
  renderPlaylistDetail() {
    const { playlistObj, playerState } = this.props;

    if ('trackArr' in playlistObj) {
      const {
        playlistName,
        playlistDescription,
        playlistFollowers,
        playlistImgUrl,
        artistLink,
        trackArr,
        trackUriArr,
        contextUri,
      } = playlistObj;

      const imgStyle = { backgroundImage: `url(${playlistImgUrl})`};

      return (
        <div className="playlist">
          <div className="playlist__info-wrapper">
            <div className="playlist__img" style={imgStyle}></div>
            <div className="playlist__text-wrapper">
              <div className="playlist__title">{playlistName}
                <PlayIconContainer
                  playerState={playerState}
                  playlistObj={playlistObj}
                  handlePlayClick={this.handlePlayClick}
                  handlePauseClick={this.handlePauseClick}
                  trackUriArr={trackUriArr}
                  playType='play-all'
                />
              </div>
              <div className="playlist_description">{playlistDescription}</div>
              <div className="playlist__followers">{playlistFollowers} followers</div>
            </div>
          </div>
          <TrackTable
            trackArr={trackArr}
            trackUriArr={trackUriArr}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <Fragment>
        <SideNav
          title='Recently Played'
          selectionArr={this.getPlaylistHistory()}
          handleSelect={this.handlePlayHistorySelect}
          navType='detail-container'
        />
        <div className="content">
          {this.renderPlaylistDetail()}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistObj: state.playlist.playlistObj,
    playlistHistoryArr: state.playlist.playlistHistoryArr,
    playerState: state.app.playerState,
    playedPlayerState: state.app.playedPlayerState,
    deviceId: state.app.deviceId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContainer);
