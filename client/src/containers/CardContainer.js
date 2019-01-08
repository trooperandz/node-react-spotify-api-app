/**
 * Main wrapper for all content cards
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArtistCard from '../components/ArtistCard';
import CategoryCard from '../components/CategoryCard';

const SEARCH_TYPE = 'search';
const NEW_RELEASES_TYPE = 'new-releases';
const CATEGORIES_TYPE = 'categories';

class CardContainer extends Component {
  constructor(props) {
    super(props);

  }

  // Return the applicable card component based on type of results
  getCardsByType() {
    const { containerType, resultsArr } = this.props;

    switch(containerType) {
      case SEARCH_TYPE:
        return <ArtistCard cardArr={resultsArr} cardType='search' />;
        break;
      case NEW_RELEASES_TYPE:
        return <ArtistCard cardArr={resultsArr} />;
        break;
      case CATEGORIES_TYPE:
        return <CategoryCard cardArr={resultsArr} />;
        break;
    }

    return null;
  }

  getHeadingTitle() {
    const { containerType, selectedSidenavObj } = this.props;

    let headingName;
    let headingTitle;

    // We use the last selected side nav object to populate the heading title
    if (selectedSidenavObj && selectedSidenavObj.hasOwnProperty('name')) {
      const { name } = selectedSidenavObj;

      headingName = name;
    }

    switch(containerType) {
      case SEARCH_TYPE:
        headingTitle = 'Search Results';
        break;
      case NEW_RELEASES_TYPE:
        headingTitle = `New Releases in ${headingName}`;
        break;
      case CATEGORIES_TYPE:
        headingTitle = `Spotify ${headingName} Playlists`;
        break;
    }

    return headingTitle;
  }

  render() {
    const { resultsArr } = this.props;

    return (
      <div className="card-container">
        <div className="card-header">
          <h3 className="card-header__title">{this.getHeadingTitle()}</h3>
          <div className="card-header__results">Showing {resultsArr.length} Results</div>
        </div>
        <div className="card-grid-wrapper">
          {this.getCardsByType()}
        </div>
      </div>
    );
  }
}

export default CardContainer;