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
    const { progressBarWidth } = this.state;

    this.progressInterval = setInterval(() => {
      this.updateProgressBarWidth()
    }, PROGRESS_INTERVAL_MS);
  }

  updateProgressBarWidth() {
    const { trackDurationMs, trackPositionMs, isTrackPaused, playerState } = this.props;
    const { progressBarWidth } = this.state;

    // Calculate total numerical value of all possible ticks
    const totalProgressIntervals = parseFloat(trackDurationMs / PROGRESS_INTERVAL_MS);

    // Calculate each tick percentage amount, out of 100% container width;
    // will be added to each setInterval "tick"
    const intervalPercentageWidth = parseFloat(100 / totalProgressIntervals || 0);

    // Calculate track % completed width from api starting position
    const startingPercentageWidth = parseFloat(trackPositionMs / trackDurationMs);

    if (isTrackPaused) {
      this.setState({
        // progressBarWidth:  parseFloat(100 / (trackPositionMs / totalProgressIntervals))
        progressBarWidth: startingPercentageWidth * 100,
      });
    } else if (trackDurationMs) {
      this.setState({
        progressBarWidth: parseFloat(progressBarWidth + intervalPercentageWidth)
      });
    }
  }

  render() {
    const { progressBarWidth } = this.state;

    const style = {
      width: `${progressBarWidth}%`,
    };

    return (
      <div className="playStatusBar">
        <div className="playStatusBar__progress" style={style}>
          <div className="playStatusBar__marker"></div>
        </div>
      </div>
    );
  }
}

export default PlayStatusBar;