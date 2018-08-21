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

    const { name: trackName, album: { name: albumName }, artists, duration_ms: duration, href: trackHref  } = track;
    let formattedDuration = (duration/100000).toString().substring(0,4).replace('.', ':');

    return (
      <tr key={trackName} className="track-table__row">
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
        <td className="track-table__td">{artists[0].name}</td>
        <td className="track-table__td">{albumName}</td>
        <td className="track-table__td">{formattedDuration}</td>
      </tr>
    );
  }
}

export default TrackTableRow;