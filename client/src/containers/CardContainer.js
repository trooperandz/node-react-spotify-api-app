/**
 * Main wrapper for all content cards
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArtistCard from '../components/ArtistCard';
import CategoryCard from '../components/CategoryCard';

class CardContainer extends Component {
  constructor(props) {
    super(props);

  }

  // Return the applicable card component based on type of results
  getCardsByType() {
    const { newReleaseArr, categoriesArr, searchResultsArr } = this.props;

    if (newReleaseArr && newReleaseArr.length) {
      return <ArtistCard cardArr={newReleaseArr} />;
    } else if (categoriesArr && categoriesArr.length) {
      return <CategoryCard cardArr={categoriesArr} />;
    } else if (searchResultsArr && searchResultsArr.length) {
      return <ArtistCard cardArr={searchResultsArr} />;
    }
  }

  render() {
    return (
      <div className="card-wrapper">
        {this.getCardsByType()}
      </div>
    );
  }
}

export default CardContainer;