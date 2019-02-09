import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';
import TrackTableRow from './TrackTableRow';

class TrackTable extends Component {
  constructor(props) {
    super(props);
  }

  renderTrackRows() {
    const { trackArr, trackUriArr, playerState } = this.props;

    return trackArr.map((trackObj, i) => {
      const { trackHref } = trackObj;

      return (
        <TrackTableRow
          key={trackHref}
          track={trackObj}
          playerState={playerState}
          trackUriArr={trackUriArr}
          trackOffset={i}
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
            <th className="track-table__th">Length</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTrackRows()}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    playbackState: state.app.playbackState,
    playerState: state.app.playerState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackTable);