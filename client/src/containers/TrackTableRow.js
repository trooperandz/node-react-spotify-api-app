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
    const {
      deviceId,
      playerState,
      playlistObj,
      trackUriArr,
      trackOffset,
      appActions: { playSpotifyTrack }
    } = this.props;

    let resumePositionMs;

    // If we have a previously saved player state, extract uri & determine if we "resume" play
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        position,
        track_window: { current_track: { uri: pausedTrackUri } }
      } = playerState;

      if (trackUri === pausedTrackUri) {
        resumePositionMs = position;
      }
    }

    playSpotifyTrack(deviceId, trackUriArr, resumePositionMs, trackOffset, playlistObj);
  }

  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

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
)(TrackTableRow);