/**
 * Displays all info relating to specific album, playlist etc (track listings)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import playlistActions from '../actions/playlistActions';
import TrackTable from './TrackTable';

class DetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackPlaying: false,
    }
  }

  render() {
    const { playlistObj } = this.props;

    if ('trackArr' in playlistObj) {
      const {
        playlistName,
        playlistDescription,
        playlistFollowers,
        playlistImgUrl,
        artistLink,
        trackArr,
      } = playlistObj;

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
          <TrackTable trackArr={trackArr} />
        </div>
      );
    }

    return <h2>You aren't playing anything!  Go pick something...</h2>;
  }
}

function mapStateToProps(state) {
  return {
    playlistObj: state.playlist.playlistObj,
    // playlistObj: state.newReleases.playlistObj,
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
