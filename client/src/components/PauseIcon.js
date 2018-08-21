import React, { Component } from 'react';

class PauseIcon extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { onClickPause } = this.props;

    return (
      <svg onClick={onClickPause} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-3v-10h3v10zm5-10h-3v10h3v-10z"/></svg>
    );
  }
}

export default PauseIcon;
