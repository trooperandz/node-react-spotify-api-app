import React, { Component } from 'react';

import PlayIcon from '../components/PlayIcon';
import PauseIcon from '../components/PauseIcon';

class TestTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowPlay: true,
    }

    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
  }

  getControl() {
    const { shouldShowPlay } = this.state;

    if (shouldShowPlay) {
      return <PlayIcon onClickPlay={ this.onClickPlay } />;
    } else {
      return <PauseIcon onClickPause={ this.onClickPause } />;
    }
  }

  onClickPause() {
    console.log('clicked pause...');
    this.setState({ shouldShowPlay: true });
  }

  onClickPlay() {
    console.log('clicked play...');
    this.setState({ shouldShowPlay: false });
  }

  render() {
    const { data: { name, length } } = this.props;

    return (
      <tr>
        <td>{this.getControl()}</td>
        <td>{name}</td>
        <td>{length}</td>
      </tr>
    );
  }
}

export default TestTableRow;