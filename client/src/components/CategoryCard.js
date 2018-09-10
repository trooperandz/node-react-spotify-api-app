import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import playlistActions from '../actions/playlistActions';

class CategoryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDetailView: false,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(ownerId, playlistId) {
    const { playlistActions: { fetchPlaylist } } = this.props;

    fetchPlaylist(ownerId, playlistId);
    this.setState({ redirectToDetailView: true });
  }

  renderCards() {
    const { cardArr } = this.props;

    const cards = cardArr.map((card, i) => {
      const { playlistId, playlistName, ownerId, imgUrl, categoryHref } = card;

      return (
        <div key={playlistId} className="card card--category" onClick={() => this.handleCardClick(ownerId, playlistId)}>
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
)(CategoryCard);