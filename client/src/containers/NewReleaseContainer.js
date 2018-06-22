import React, { Component } from 'react';
import CardContainer from './CardContainer';

class NewReleaseContainer extends Component {
  constructor(props) {
    super(props);

    this.state= {
      newReleaseCardArr: [],
    };
  }
  
  render() {
    return (
      <div>
        <CardContainer />
      </div>
    );
  }
}

export default NewReleaseContainer;