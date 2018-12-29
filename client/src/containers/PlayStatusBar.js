/**
 * Actual progress bar that shows track length status
 */

import React, { Component } from 'react';

// Progress per tick; determines setInterval amount & total ticks available for % width
const PROGRESS_INTERVAL_MS = 100;

class PlayStatusBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progressBarWidth: 0,
    };
  }

  componentDidMount() {
    this.initializeProgressBar();
  }

  initializeProgressBar() {
    this.progressInterval = setInterval(() => {
      this.updateProgressBar();
    }, PROGRESS_INTERVAL_MS);
  }

  updateProgressBar() {
    const { trackDurationMs, trackPositionMs, isTrackPaused, playerState, trackUri } = this.props;
    const { progressBarWidth, previousTrackDurationMs } = this.state;

    if (!this.currentTrackUri) this.currentTrackUri = trackUri;

    // Calculate total numerical value of all possible ticks
    const totalProgressIntervals = parseFloat(trackDurationMs / PROGRESS_INTERVAL_MS);

    // Calculate each tick percentage amount, out of 100% container width;
    // will be added to each setInterval "tick"
    const intervalPercentageWidth = parseFloat(100 / totalProgressIntervals || 0);

    // Calculate track % completed width from api starting position
    const startingPercentageWidth = parseFloat(trackPositionMs / trackDurationMs);

    if (isTrackPaused) {
      this.setState({
        progressBarWidth: startingPercentageWidth * 100,
      });

      // clearInterval(this.progressInterval);
    } else if (trackDurationMs) {
      if (this.currentTrackUri === trackUri) {

        this.setState({
          progressBarWidth: parseFloat(progressBarWidth + intervalPercentageWidth),
        });
      } else {
        clearInterval(this.progressInterval);

        this.setState({
          progressBarWidth: 0,
        });

        this.currentTrackUri = null;

        this.initializeProgressBar();
      }
    }
  }

  render() {
    const { progressBarWidth } = this.state;

    const progressStyle = {
      width: `${progressBarWidth}%`,
    };

    return (
      <div className="playStatusBar">
        <div className="playStatusBar__progress" style={progressStyle}>
          <div className="playStatusBar__marker"></div>
        </div>
      </div>
    );
  }
}

export default PlayStatusBar;