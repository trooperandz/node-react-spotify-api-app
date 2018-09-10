/**
 * Display album cards (covers)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import playlistActions from '../actions/playlistActions';

class ArtistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDetailView: false,
    };
  }

  handleCardClick(albumId) {
    const { playlistActions: { fetchAlbum } } = this.props;

    fetchAlbum(albumId);
    this.setState({ redirectToDetailView: true });
  }

  renderCards() {
    const { cardArr } = this.props;

    const cards = cardArr.map((card, i) => {
      const { albumId, artist, albumName, imgUrl, releaseDate, albumHref } = card;

      return (
        <div key={albumId} className="card card--artist" onClick={() => this.handleCardClick(albumId)}>
          <img className="card__img" src={imgUrl} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistCard);