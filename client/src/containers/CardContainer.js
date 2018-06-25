import React, { Component } from 'react';
import Card from '../components/Card';

// State container for all music cards
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

    return formattedAlbumArr;
  }

  render() {
    return (
      <div className="card-wrapper">
        <Card cardArr={this.formatAlbumCards()} />
      </div>
    );
  }
}

export default CardContainer;