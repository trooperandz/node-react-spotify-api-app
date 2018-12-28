/**
 * Render play and pause icons in the track listing table
 */

import React, { Component } from 'react';

import PlayIcon from '../components/PlayIcon';
import PauseIcon from '../components/PauseIcon';

class PlayIconContainer extends Component {
  constructor(props) {
    super(props);
  }

  handlePlayClick(trackUri) {
    const { handlePlayClick } = this.props;

    handlePlayClick(trackUri);
  }

  handlePauseClick() {
    const { handlePauseClick } = this.props;

    handlePauseClick();
  }

  render() {
    const { playerState, trackUri } = this.props;

    let shouldShowPauseIcon = false;

    // Show pause icon anytime play has status of !paused and requirements are met
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        paused,
        position,
        track_window: { current_track: { id: currentTrackId, uri: currentTrackUri } }
      } = playerState;

      if (!paused) {
        if (trackUri && trackUri === currentTrackUri) {
          shouldShowPauseIcon = true;
        }
      }
    }

    if (shouldShowPauseIcon) {
      return <PauseIcon onClickPause={() => this.handlePauseClick(trackUri)} />;
    } else {
      return <PlayIcon onClickPlay={() => this.handlePlayClick(trackUri)} />;
    }
  }
}

export default PlayIconContainer;