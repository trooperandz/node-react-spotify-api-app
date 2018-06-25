import React from 'react';

const Card = (props) => {
  const { cardArr } = props;
  
  const cards = cardArr.map((card, i) => {
    const { albumId, artist, albumName, imgUrl, releaseDate, albumHref } = card;

    const styles = {
      backgroundImage: `url(${imgUrl})`,
    };

    return (
      <div key={albumId} className="card" style={styles}>
        <div>{artist}</div>
        <div>{albumName}</div>
        <div>{releaseDate}</div>
      </div>
    );
  });

  return cards;
}

export default Card;