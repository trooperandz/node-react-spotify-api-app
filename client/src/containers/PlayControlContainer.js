import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';
import PlayIconContainer from './PlayIconContainer';

class PlayControlContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePlayClick(trackUri) {
    const { deviceId, appActions: { playSpotifyTrack } } = this.props;

    playSpotifyTrack(deviceId, trackUri);
  }

  handlePauseClick() {
    const { appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack();
  }

  render() {
    const { playerState } = this.props;

    let trackUri;

    // PlayControlContainer only renders when a play occurs; we should always have playerState
    if (playerState.hasOwnProperty('track_window')) {
      const {
        track_window: { current_track: { id: currentTrackId, uri: currentTrackUri } }
      } = playerState;

      trackUri = currentTrackUri;
    }

    return (
      <div className="playcontrol">
        <div className="playcontrol__image">
          <img src="https://upload.wikimedia.org/wikipedia/en/6/6a/DMB_Crash.png" />
        </div>
        <div className="playcontrol__content">
          <div className="playcontrol__info">
            <h3 className="playcontrol__track-title">Tripping Billies</h3>
            <p className="playcontrol__track-description">The best song you've ever heard...</p>
          </div>
          <div className="playcontrol__play-icons">
            <div className="playcontrol__play-icon">
              <PlayIconContainer
                playerState={playerState}
                handlePlayClick={this.handlePlayClick}
                handlePauseClick={this.handlePauseClick}
                trackUri={trackUri}
              />
            </div>
          </div>
          <div className="playcontrol__more-actions">
            <p className="playcontrol__more-stuff">More stuff</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playerState: state.app.playerState,
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