import React, { Component } from 'react';
import Card from '../components/Card';

// State container for all music cards
class CardContainer extends Component {
  constructor(props) {
    super(props);

  }

  getCardArr() {
    const cardArr = [
      {
        artist: 'MH Fleek',
        albumTitle: 'They\'s-is-a-Dyin\'',
        description: 'Get it today or you die.',
      },
      {
        artist: 'MH Fleek',
        albumTitle: 'They\'s-is-a-Dyin\'',
        description: 'Get it today or you die.',
      },
      {
        artist: 'MH Fleek',
        albumTitle: 'They\'s-is-a-Dyin\'',
        description: 'Get it today or you die.',
      },
      {
        artist: 'MH Fleek',
        albumTitle: 'They\'s-is-a-Dyin\'',
        description: 'Get it today or you die.',
      },
      {
        artist: 'MH Fleek',
        albumTitle: 'They\'s-is-a-Dyin\'',
        description: 'Get it today or you die.',
      },
    ];

    return cardArr;
  }

  render() {
    return (
      <div className="card-wrapper">
        <Card cardArr={this.getCardArr()} />
      </div>
    );
  }
}

export default CardContainer;