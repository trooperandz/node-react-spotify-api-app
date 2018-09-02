import React, { Component } from 'react';

import PlayControlContainer from './PlayControlContainer';

class TrackTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowPlayIcon: true,
    }

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePlayClick() {
    const { shouldShowPlayIcon } = this.state;

    this.setState({ shouldShowPlayIcon: !shouldShowPlayIcon });
  }

  handlePauseClick() {
    const { shouldShowPlayIcon } = this.state;

    this.setState({ shouldShowPlayIcon: !shouldShowPlayIcon });
  }

  render() {
    const { track, handlePlayControlClick, shouldForcePlayIcons } = this.props;
    const { shouldShowPlayIcon } = this.state;

    const {
      trackId,
      trackName,
      trackNumber,
      trackDuration,
      trackHref,
      albumName,
      albumHref,
      artistName,
      artistHref,
    } = track;

    return (
      <tr key={trackId} className="track-table__row">
        <td className="track-table__td">
          <div className="track-table__control-icon">
            <PlayControlContainer
              shouldShowPlayIcon={shouldShowPlayIcon}
              handlePlayClick={this.handlePlayClick}
              handlePauseClick={this.handlePauseClick}
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

export default TrackTableRow;