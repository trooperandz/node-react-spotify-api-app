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

  handlePauseClick(trackUri) {
    const { handlePauseClick } = this.props;

    handlePauseClick(trackUri);
  }

  render() {
    const {
      shouldShowPauseIcon,
      trackUri
    } = this.props;

    if (shouldShowPauseIcon) {
      return <PauseIcon onClickPause={() => this.handlePauseClick(trackUri)} />;
    } else {
      return <PlayIcon onClickPlay={() => this.handlePlayClick(trackUri)} />;
    }
  }
}

export default PlayIconContainer;