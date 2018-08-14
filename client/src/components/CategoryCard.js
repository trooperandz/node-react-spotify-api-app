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
    console.log({ownerId});
    console.log({playlistId});
    fetchPlaylist(ownerId, playlistId);
    this.setState({ redirectToDetailView: true });
  }

  renderCards() {
    const { cardArr } = this.props;

    const cards = cardArr.map((card, i) => {
      const { playlistId, playlistName, ownerId, imgUrl, categoryHref } = card;

      const styles = {
        backgroundImage: `url(${imgUrl})`,
      };

      return (
        <div key={playlistId} className="card card--category" style={styles} onClick={() => this.handleCardClick(ownerId, playlistId)}>
          <div className="card__category-title">{playlistName}</div>
        </div>
      );
    });

    return cards;
  }

  render() {
    const { redirectToDetailView } = this.state;

    if (redirectToDetailView) return <Redirect to="/detail"/>;

    return this.renderCards();
  }
}

function mapStateToProps(state) {
  return state;
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