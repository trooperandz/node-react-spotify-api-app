/**
 * Display album cards (covers)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import newReleaseActions from '../actions/newReleaseActions';

class ArtistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDetailView: false,
    };
  }

  handleCardClick(albumId) {
    console.log('handleCardClick running...');
    const { newReleaseActions: { fetchAlbum } } = this.props;
    console.log({albumId});

    fetchAlbum(albumId);
    this.setState({ redirectToDetailView: true });
  }

  renderCards() {
    const { cardArr } = this.props;

    const cards = cardArr.map((card, i) => {
      const { albumId, artist, albumName, imgUrl, releaseDate, albumHref } = card;

      const styles = {
        backgroundImage: `url(${imgUrl})`,
      };

      return (
        <div key={albumId} className="card card--artist" style={styles} onClick={() => this.handleCardClick(albumId)}>
          <div>{artist}</div>
          <div>{albumName}</div>
          <div>{releaseDate}</div>
        </div>
      );
    });

    return cards;
  }

  render() {
    const { albumObj } = this.props;
    const { redirectToDetailView } = this.state;

    if (redirectToDetailView && 'tracks' in albumObj) return <Redirect to="/detail"/>;

    return this.renderCards();
  }
}

function mapStateToProps(state) {
  return {
    albumObj: state.newReleases.albumObj,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newReleaseActions: bindActionCreators(newReleaseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistCard);