import React, { Component } from 'react';

import PlayIcon from '../components/PlayIcon';
import PauseIcon from '../components/PauseIcon';

class PlayControlContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handlePlayClick, handlePauseClick, shouldShowPlayIcon } = this.props;

    if (shouldShowPlayIcon) {
      return <PlayIcon onClickPlay={handlePlayClick} />;
    } else {
      return <PauseIcon onClickPause={handlePauseClick} />;
    }
  }
}

export default PlayControlContainer;