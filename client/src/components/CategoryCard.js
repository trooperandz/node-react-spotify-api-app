import React from 'react';

const CategoryCard = (props) => {
  const { cardArr } = props;
  
  const cards = cardArr.map((card, i) => {
    const { categoryId, categoryName, imgUrl, categoryHref } = card;

    const styles = {
      backgroundImage: `url(${imgUrl})`,
    };

    return (
      <div key={categoryId} className="card card--category" style={styles}>
        <div>{categoryName}</div>
      </div>
    );
  });

  return cards;
}

export default CategoryCard;