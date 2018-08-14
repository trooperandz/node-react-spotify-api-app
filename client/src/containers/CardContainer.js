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

  /**
   * Format the album array into usable objects.
   * Desired format: { albumId, artist, albumName, imgUrl, releaseDate, albumHref }
   */
  formatAlbumCards() {
    const { newReleaseArr } = this.props;

    const formattedAlbumArr = newReleaseArr.reduce((arr, newRelease) => {
      const {
        id: albumId,
        artists,
        name: albumName,
        images,
        release_date: releaseDate,
        href: albumHref,
      } = newRelease;

      const albumObj = {
        albumId,
        artist: artists[0].name,
        albumName,
        imgUrl: images[1].url,
        releaseDate,
        albumHref,
      };

      arr.push(albumObj);

      return arr;
    }, []);

    return (
      <ArtistCard cardArr={formattedAlbumArr} />
    );
  }

  /**
   * Format the categories array into usable objects.
   */
  formatCategoryCards() {
    const { categoriesArr } = this.props;

    const formattedCardArr = categoriesArr.reduce((arr, category) => {
      const {
        id: playlistId,
        name: playlistName,
        owner: { id: ownerId },
        images,
        href: categoryHref,
      } = category;

      const categoryObj = {
        playlistId,
        playlistName,
        ownerId,
        imgUrl: images[0].url,
        categoryHref,
      };

      arr.push(categoryObj);

      return arr;
    }, []);

    return <CategoryCard cardArr={formattedCardArr} />;
  }

  // TODO: tap into redux for card arrays
  getFormattedCards() {
    const { newReleaseArr, categoriesArr } = this.props;

    if (newReleaseArr && newReleaseArr.length) {
      return this.formatAlbumCards();
    } else if (categoriesArr && categoriesArr.length) {
      return this.formatCategoryCards();
    }
  }

  render() {
    return (
      <div className="card-wrapper">
        {this.getFormattedCards()}
      </div>
    );
  }
}

export default CardContainer;