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
    this.handleStepClick = this.handleStepClick.bind(this);
  }

  handlePlayClick(trackUri) {
    const {
      deviceId,
      playerState,
      playedPlayerState,
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

    playSpotifyTrack(deviceId, currentTrackUriArr, resumePositionMs, currentTrackOffset);
  }

  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  handleStepClick() {
    console.log('clicked step control...')
  }

  render() {
    const { playerState } = this.props;

    let trackUri;
    let trackDurationMs;
    let trackPositionMs;
    let isTrackPaused;

    // PlayControlContainer only renders when a play occurs; we should always have playerState
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
      <div className="playcontrol">
        <PlayStatusBar
          playerState={playerState}
          trackDurationMs={trackDurationMs}
          trackPositionMs={trackPositionMs}
          isTrackPaused={isTrackPaused}
          trackUri={trackUri}
        />
        <div className="playcontrol__image">
          <img src="https://upload.wikimedia.org/wikipedia/en/6/6a/DMB_Crash.png" />
        </div>
        <div className="playcontrol__info">
          <h3 className="playcontrol__track-title">Tripping Billies</h3>
          <p className="playcontrol__track-description">The best song you've ever heard...</p>
        </div>
        <div className="playcontrol__play-icons">
          <TrackBackwardIcon handleStepClick={this.handleStepClick} />
          <PlayIconContainer
            playerState={playerState}
            handlePlayClick={this.handlePlayClick}
            handlePauseClick={this.handlePauseClick}
            trackUri={trackUri}
          />
          <TrackForwardIcon handleStepClick={this.handleStepClick} />
        </div>
        <div className="playcontrol__more-actions">
          <p className="playcontrol__more-stuff">More stuff</p>
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