import React from 'react';

const Card = (props) => {
  const { cardArr } = props;
  
  const cards = cardArr.map((card) => {
    const { artist, albumTitle, description } = card;

    return (
      <div className="card">
        <div>{artist}</div>
        <div>{albumTitle}</div>
        <div>{description}</div>
      </div>
    );
  });

  return cards;
}

export default Card;