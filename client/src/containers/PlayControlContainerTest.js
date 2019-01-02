import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';
import PlayIconContainer from './PlayIconContainer';
import PlayStatusBar from './PlayStatusBar';

class PlayControlContainerTest extends Component {
  constructor(props) {
    super(props);

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePlayClick(trackUri) {
    const { deviceId, playerState, pausedPlayerState, appActions: { playSpotifyTrack } } = this.props;

    let resumePositionMs;

    // If we have a previously paused player state, extract uri & determine if we "resume" play
    if (pausedPlayerState && pausedPlayerState.hasOwnProperty('track_window')) {
      const {
        track_window: { current_track: { id: pausedTrackId, uri: pausedTrackUri } }
      } = pausedPlayerState;

      if (trackUri === pausedTrackUri) {
        const { position: pausedPosition } = playerState;
        resumePositionMs = pausedPosition;
      }
    }

    playSpotifyTrack(deviceId, trackUri, resumePositionMs);
  }

  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  render() {
    const { playerState } = this.props;

    let trackUri;
    let trackDurationMs;
    let trackPositionMs;
    let isTrackPaused;

    // PlayControlContainerTest only renders when a play occurs; we should always have playerState
    if (playerState.hasOwnProperty('track_window')) {
      const {
        paused,
        duration,
        position,
        track_window: { current_track: { id: currentTrackId, uri: currentTrackUri } }
      } = playerState;

      trackUri = currentTrackUri;
      isTrackPaused = paused;
      trackDurationMs = duration;
      trackPositionMs = position;
    }

    return (
      <div className="test">
        <div className="test__img"></div>
        <div className="test__description">Description of the song....</div>
        <div className="test__play-icon">
          <div className="test__play-icon--switch">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>
          </div>
          <div className="test__play-icon--play">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>
          </div>
          <div className="test__play-icon--switch">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>
          </div>
        </div>
        <div className="test__info">More Stuff</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playerState: state.app.playerState,
    pausedPlayerState: state.app.playerState,
    deviceId: state.app.deviceId,
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
)(PlayControlContainerTest);