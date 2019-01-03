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

  handlePlayClick(context) {
    const { handlePlayClick } = this.props;

    handlePlayClick(context);
  }

  handlePauseClick() {
    const { handlePauseClick } = this.props;

    handlePauseClick();
  }

  render() {
    const { playerState, trackUri, trackUriArr } = this.props;

    let shouldShowPauseIcon = false;
    let context; // Type of play to provide the play instruction (we use a track uri array)

    // Sometimes we play single tracks; other times we play an entire album or playlist
    if (trackUri) {
      context = trackUri;
    } else if (trackUriArr) {
      context = trackUriArr;
    }

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
      return <PauseIcon onClickPause={() => this.handlePauseClick()} />;
    } else {
      return <PlayIcon onClickPlay={() => this.handlePlayClick(context)} />;
    }
  }
}

export default PlayIconContainer;