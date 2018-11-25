import React, { Component } from 'react';

import TrackTableRow from './TrackTableRow';

class TrackTable extends Component {
  constructor(props) {
    super(props);
  }

  renderTrackRows() {
    const { trackArr } = this.props;

    return trackArr.map((track) => {
      // console.log('track in renderTrackRows: ', track);
      return (
        <TrackTableRow
          key={track.trackHref}
          track={track}
        />
      );
    });
  }

  render() {
    return (
      <table className="track-table">
        <thead>
          <tr className="track-table__header">
          <th className="track-table__th"></th>
            <th className="track-table__th">Name</th>
            <th className="track-table__th">Artist</th>
            <th className="track-table__th">Album</th>
            <th className="track-table__th">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTrackRows()}
        </tbody>
      </table>
    );
  }
}

export default TrackTable;