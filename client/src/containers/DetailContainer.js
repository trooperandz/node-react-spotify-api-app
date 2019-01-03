/**
 * Displays all info relating to specific album, playlist etc (track listings)
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import appActions from '../actions/appActions';
import playlistActions from '../actions/playlistActions';
import SideNav from '../components/SideNav';
import TrackTable from './TrackTable';
import PlayIconContainer from './PlayIconContainer';

class DetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackPlaying: false,
    }

    this.handlePlayHistorySelect = this.handlePlayHistorySelect.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  componentDidMount() {
    const { playlistActions: { fetchPlaylistHistory } } = this.props;

    fetchPlaylistHistory();
  }

  // Generate history to choose from for side nav...will come from the db
  getPlaylistHistory() {
    const { playlistHistoryArr } = this.props;

    if (!playlistHistoryArr.length) return [ { name: 'No history...', id: '' } ];

    return playlistHistoryArr;
  }

  handlePlayClick(trackUriArr) {
    const { deviceId, appActions: { playSpotifyTrack } } = this.props;

    playSpotifyTrack(deviceId, trackUriArr);
  }

  handlePauseClick() {
    const { playerState, appActions: { pauseSpotifyTrack } } = this.props;

    pauseSpotifyTrack(playerState);
  }

  // Render image and tracks if playlistObj available; otherwise return default message
  renderPlaylistDetail() {
    const { playlistObj, playerState } = this.props;

    if ('trackArr' in playlistObj) {
      const {
        playlistName,
        playlistDescription,
        playlistFollowers,
        playlistImgUrl,
        artistLink,
        trackArr,
        trackUriArr,
        contextUri,
      } = playlistObj;

      const imgStyle = { backgroundImage: `url(${playlistImgUrl})`};

      return (
        <div className="playlist">
          <div className="playlist__info-wrapper">
            <div className="playlist__img" style={imgStyle}></div>
            <div className="playlist__text-wrapper">
              <div className="playlist__title">{playlistName}
                <PlayIconContainer
                  playerState={playerState}
                  handlePlayClick={this.handlePlayClick}
                  handlePauseClick={this.handlePauseClick}
                  trackUriArr={trackUriArr}
                />
              </div>
              <div className="playlist_description">{playlistDescription}</div>
              <div className="playlist__followers">{playlistFollowers} followers</div>
            </div>
          </div>
          <TrackTable
            trackArr={trackArr}
            trackUriArr={trackUriArr}
          />
        </div>
      );
    }

    return <div className="playlist-default-msg">You aren't playing anything!  Go pick something...</div>;
  }

  // Process side nav click action; determine relevant action by type
  handlePlayHistorySelect(itemId, itemType) {
    const { playlistActions: { fetchAlbum, fetchPlaylist } } = this.props;

    if (itemType === 'playlist') {
      fetchPlaylist('spotify', itemId); // current version returns only Spotify-procured playlists
    } else if (itemType === 'album') {
      fetchAlbum(itemId);
    }
  }

  render() {
    return (
      <Fragment>
        <SideNav
          title='Recently Played'
          selectionArr={this.getPlaylistHistory()}
          handleSelect={this.handlePlayHistorySelect}
          navType='detail-container'
        />
        <div className="content">
          {this.renderPlaylistDetail()}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistObj: state.playlist.playlistObj,
    playlistHistoryArr: state.playlist.playlistHistoryArr,
    playerState: state.app.playerState,
    deviceId: state.app.deviceId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContainer);
