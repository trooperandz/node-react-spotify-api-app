/**
 * The "currently playing" container fixed to the bottom of the app.
 * Displays current album or playlist information, and contains live progress bar and
 * any additional track controls like previous track & next track.
 * Allows play control while navigating throughout the app, regardless of current view.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';
import PlayIconContainer from './PlayIconContainer';
import PlayStatusBar from './PlayStatusBar';
import TrackForwardIcon from '../components/TrackForwardIcon';
import TrackBackwardIcon from '../components/TrackBackwardIcon';

class PlayControlContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  // Handle play icon clicks and determine resume position if previous play occurred
  handlePlayClick(trackUri) {
    const {
      deviceId,
      playerState,
      playedPlayerState,
      playlistObj,
      appActions: { playSpotifyTrack }
    } = this.props;

    let currentTrackUriArr;
    let currentTrackOffset;
    let resumePositionMs;

    // This should always exist for PlayControlContainer, since it only appears after a play event
    if (playedPlayerState && playedPlayerState.hasOwnProperty('context')) {
      const {
        context,
        trackOffset,
      } = playedPlayerState;

      currentTrackUriArr = context;
      currentTrackOffset = trackOffset;
    }

    // If we have a previously paused player state, determine & save our resume position
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        position,
        track_window: { current_track: { uri: pausedTrackUri } }
      } = playerState;

      if (trackUri === pausedTrackUri) {
        resumePositionMs = position;
      }
    }

    // This will only occur if the VERY first play click occurs from PlayControlContainer
    if (!currentTrackUriArr) currentTrackUriArr = trackUri;

    playSpotifyTrack(deviceId, currentTrackUriArr, resumePositionMs, currentTrackOffset, playlistObj);
  }

  // Handle pause icon clicks and save current player state
  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  // Proceed to the next track of the album or playlist
  handleNextClick() {
    const { deviceId, appActions: { fetchNextTrack } } = this.props;
    fetchNextTrack(deviceId);
  }

  // Go back to the previous track of the album or playlist
  handlePreviousClick() {
    const { deviceId, appActions: { fetchPreviousTrack } } = this.props;
    fetchPreviousTrack(deviceId);
  }

  render() {
    const { playerState, playedPlayerState, playlistObj } = this.props;

    let trackUri;
    let trackDurationMs;
    let trackPositionMs;
    let isTrackPaused;

    // Album/playlist display info
    let currentPlaylistName;
    let currentPlaylistImgUrl;
    let currentPlaylistDescription;
    let currentTrackName;

    // PlayControlContainer only renders when a play occurs; we should always have playerState
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        paused,
        duration,
        position,
        track_window: {
          current_track: {
            name,
            uri: currentTrackUri,
          } = {},
        }
      } = playerState;

      trackUri = currentTrackUri;
      isTrackPaused = paused;
      trackDurationMs = duration;
      trackPositionMs = position;
      currentTrackName = name;
    }

    // We use the previously played playlistObj; not the current one, because we may have active
    // play occurring while user is browsing playlists or albums.
    // However, if none is available, grab the info from the default playlist object determined
    // in DetailContainer.
    if (playedPlayerState && playedPlayerState.hasOwnProperty('playlistObj')) {
      const {
        playlistObj: {
          playlistName,
          playlistDescription,
          playlistFollowers,
          playlistImgUrl,
          artistLink,
          trackArr,
          trackUriArr,
          contextUri,
        } = {},
      } = playedPlayerState;

      currentPlaylistName = playlistName;
      currentPlaylistImgUrl = playlistImgUrl;
      currentPlaylistDescription = playlistDescription.split('-')[0].trim();
    } else if (playlistObj && playlistObj.hasOwnProperty('trackUriArr')) {
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

      currentPlaylistName = playlistName;
      currentPlaylistImgUrl = playlistImgUrl;
      currentPlaylistDescription = playlistDescription.split('-')[0].trim();
      currentTrackName = trackArr[0].name;
      trackUri = trackUriArr;
    }

    return (
      <div className="playcontrol">
        <PlayStatusBar
          playerState={playerState}
          trackDurationMs={trackDurationMs}
          trackPositionMs={trackPositionMs}
          isTrackPaused={isTrackPaused}
          trackUri={trackUri}
        />
        <div className="playcontrol__image">
          <img src={currentPlaylistImgUrl} alt="Album Title" />
        </div>
        <div className="playcontrol__info">
          <h3 className="playcontrol__track-title">{currentTrackName}</h3>
          <p className="playcontrol__track-description">{currentPlaylistName}</p>
          <p className="playcontrol__track-description">{currentPlaylistDescription}</p>
        </div>
        <div className="playcontrol__play-icons">
          <TrackBackwardIcon  handlePreviousClick={() => this.handlePreviousClick()}/>
          <PlayIconContainer
            playerState={playerState}
            handlePlayClick={this.handlePlayClick}
            handlePauseClick={this.handlePauseClick}
            trackUri={trackUri}
          />
          <TrackForwardIcon handleNextClick={() => this.handleNextClick()} />
        </div>
        <div className="playcontrol__more-actions">
          <p>Crafted with <i class="fas fa-heart"></i></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playerState: state.app.playerState,
    playedPlayerState: state.app.playedPlayerState,
    deviceId: state.app.deviceId,
    playlistObj: state.playlist.playlistObj,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayControlContainer);