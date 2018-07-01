/**
 * Main wrapper for all content cards
 */

import React, { Component } from 'react';
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
    const { albumArr } = this.props;

    const formattedAlbumArr = albumArr.reduce((arr, album) => {
      const {
        id: albumId,
        artists,
        name: albumName,
        images,
        release_date: releaseDate,
        href: albumHref,
      } = album;

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
   * Desired format: { categoryId, categoryName, imgUrl, categoryHref }
   */
  formatCategoryCards() {
    const { categoriesArr } = this.props;

    const formattedCategoryArr = categoriesArr.reduce((arr, category) => {
      const {
        id: categoryId,
        name: categoryName,
        icons,
        href: categoryHref,
      } = category;

      const categoryObj = {
        categoryId,
        categoryName,
        imgUrl: icons[0].url,
        categoryHref,
      };

      arr.push(categoryObj);

      return arr;
    }, []);

    return <CategoryCard cardArr={formattedCategoryArr} />;
  }

  // TODO: tap into redux for card arrays
  getFormattedCards() {
    const { albumArr, categoriesArr } = this.props;

    if (albumArr && albumArr.length) {
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