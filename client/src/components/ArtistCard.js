import React from 'react';

const ArtistCard = (props) => {
  const { cardArr } = props;
  
  const cards = cardArr.map((card, i) => {
    const { albumId, artist, albumName, imgUrl, releaseDate, albumHref } = card;

    const styles = {
      backgroundImage: `url(${imgUrl})`,
    };

    return (
      <div key={albumId} className="card card--artist" style={styles}>
        <div>{artist}</div>
        <div>{albumName}</div>
        <div>{releaseDate}</div>
      </div>
    );
  });

  return cards;
}

export default ArtistCard;