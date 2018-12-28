import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';
import PlayIconContainer from './PlayIconContainer';

class TrackTableRow extends Component {
  constructor(props) {
    super(props);

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePlayClick(trackUri) {
    const { deviceId, playerState, pausedPlayerState, appActions: { playSpotifyTrack } } = this.props;

    let resumePositionMs;

    // If we have a previously saved player state, extract uri & determine if we "resume" play
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
    const { playerState, appActions: { pauseSpotifyTrack, savePausedPlayerState } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  render() {
    const { track, playerState } = this.props;

    const {
      trackId,
      trackName,
      trackNumber,
      trackDuration,
      trackHref,
      trackUri,
      albumName,
      albumHref,
      artistName,
      artistHref,
    } = track;

    return (
      <tr key={trackId} className="track-table__row">
        <td className="track-table__td">
          <div className="track-table__control-icon">
            <PlayIconContainer
              playerState={playerState}
              handlePlayClick={this.handlePlayClick}
              handlePauseClick={this.handlePauseClick}
              trackUri={trackUri}
            />
          </div>
        </td>
        <td className="track-table__td">{trackName}</td>
        <td className="track-table__td">{artistName}</td>
        <td className="track-table__td">{albumName}</td>
        <td className="track-table__td">{trackDuration}</td>
      </tr>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceId: state.app.deviceId,
    pausedPlayerState: state.app.playerState,
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
)(TrackTableRow);