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
      // Set the card type so we can dictate specific card click actions (like saving search term)
      return <ArtistCard cardArr={searchResultsArr} cardType='search' />;
    }

    return null;
  }

  render() {
    return (
      <div className="card-grid-wrapper">
        {this.getCardsByType()}
      </div>
    );
  }
}

export default CardContainer;