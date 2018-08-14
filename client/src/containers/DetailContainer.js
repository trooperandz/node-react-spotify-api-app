/**
 * Displays all info relating to specific album, playlist etc (track listings)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import playlistActions from '../actions/playlistActions';

class DetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderTrackRows(trackArr) {
    const trackList = trackArr.map(({ track }) => {
      const { name: trackName, album: { name: albumName }, artists, duration_ms: duration, href: trackHref  } = track;
      // const formattedDuration = numeral(duration/10).format('00:00:00').substring(0,4);
      let formattedDuration = (duration/100000).toString().substring(0,4).replace('.', ':');
      // formattedDuration = formattedDuration.substring(0,4);

      return (
        <tr key={trackName} className="track-table__row">
          <td className="track-table__td">{trackName}</td>
          <td className="track-table__td">{artists[0].name}</td>
          <td className="track-table__td">{albumName}</td>
          <td className="track-table__td">{formattedDuration}</td>
        </tr>
      );
    });

    return trackList;
  }

  render() {
    const { playlistObj } = this.props;

    if ('tracks' in playlistObj) {
      const { playlistName, playlistDescription, playlistFollowers, playlistImgUrl, tracks: trackArr } = playlistObj;

      const imgStyle = { backgroundImage: `url(${playlistImgUrl})`};

      return (
        <div className="playlist">
          <div className="playlist__info-wrapper">
            <div className="playlist__img" style={imgStyle}></div>
            <div className="playlist__text-wrapper">
              <div className="playlist__title">{playlistName}</div>
              <div className="playlist_description">{playlistDescription}</div>
              <div className="playlist__followers">{playlistFollowers}</div>
            </div>
          </div>
          <table className="track-table">
            <thead>
              <tr className="track-table__header">
                <th className="track-table__th">Name</th>
                <th className="track-table__th">Artist</th>
                <th className="track-table__th">Album</th>
                <th className="track-table__th">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTrackRows(trackArr)}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    playlistObj: state.playlistObj,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContainer);
