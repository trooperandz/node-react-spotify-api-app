import React, { Component } from 'react';
import axios from 'axios';
import CardContainer from './CardContainer';

class NewReleaseContainer extends Component {
  constructor(props) {
    super(props);

    this.state= {
      albumArr: [],
    };
  }

  componentDidMount() {
    const { albumArr } = this.state;

    if (!albumArr.length) {
      axios.get('/spotify/new-releases')
        .then((response) => {
          console.log('response: ', response);
          this.setState({ albumArr: response.data.albumArr });
        })
        .catch((error) =>  {
          console.log(error);
        });
    }
  }
  
  render() {
    const { albumArr } = this.state;

    if (albumArr.length) {
      return (
        <div>
          <CardContainer albumArr={albumArr} />
        </div>
      );
    }

    return null;
  }
}

export default NewReleaseContainer;