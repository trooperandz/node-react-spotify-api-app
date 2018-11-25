/**
 * Display album cards (covers)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import playlistActions from '../actions/playlistActions';
import searchActions from '../actions/searchActions';
import appActions from '../actions/appActions';

class ArtistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDetailView: false,
    };
  }

  handleCardClick(albumId, albumName) {
    const {
      playlistActions: { fetchAlbum },
      searchActions: { saveSearchTerm },
      appActions: { savePlaylistSelection },
      searchTerm,
      cardType
    } = this.props;

    fetchAlbum(albumId);
    savePlaylistSelection('album', albumId, albumName);

    // If user clicked on a card in the search container, save the current searchTerm active state
    if (cardType === 'search' && searchTerm && searchTerm.length) saveSearchTerm(searchTerm.trim());

    this.setState({ redirectToDetailView: true });
  }

  renderCards() {
    const { cardArr } = this.props;

    const cards = cardArr.map((card, i) => {
      const { albumId, artist, albumName, imgUrl, releaseDate, albumHref } = card;

      return (
        <div key={albumId} className="card card--artist" onClick={() => this.handleCardClick(albumId, albumName)}>
          <img className="card__img" src={imgUrl} />
          <div className="card__description">{artist}</div>
        </div>
      );
    });

    return cards;
  }

  render() {
    const { playlistObj } = this.props;
    const { redirectToDetailView } = this.state;

    if (redirectToDetailView && 'trackArr' in playlistObj) return <Redirect to="/detail"/>;

    return this.renderCards();
  }
}

function mapStateToProps(state) {
  return {
    playlistObj: state.playlist.playlistObj,
    searchTerm: state.search.searchTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistCard);