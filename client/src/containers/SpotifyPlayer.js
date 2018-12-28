import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appActions from '../actions/appActions';

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalAccessToken: '',
    };
  }

  componentDidMount() {
    const { appActions: { fetchAccessToken } } = this.props;

    // "Troll" the back-end for the most up-to-date access token, and reinitialize player if needed
    this.trollForAccessToken = setInterval(() => {
      fetchAccessToken();
      this.checkSpotifyPlayer();
    }, 15 * 1000);
  }

  // Initialize all listeners on Spotify player instantiation
  createEventHandlers() {
    const { appActions: { receiveDeviceId, savePlayerState } } = this.props;

    // Error handling
    this.player.on('initialization_error', ({ message }) => {
      console.error('Player had an initialization error: ', message);
    });

    this.player.on('authentication_error', ({ message }) => {
      console.error('Player had an authentication error: ', message);
    });

    this.player.on('account_error', ({ message }) => {
      console.error('Player had an account error: ', message);
    });

    this.player.on('playback_error', ({ message }) => {
      console.error('Player had playback error: ', message);
    });

    // Playback status updates
    this.player.on('player_state_changed', (state) => {
      console.log('Player state changed: ', state);
      savePlayerState(state);
    });

    // Ready
    this.player.on('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      receiveDeviceId(device_id); // Save the device id to the global store
    });

    // Not Ready
    this.player.on('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  }

  // Instantiate the Spotify player if accessToken is updated
  checkSpotifyPlayer() {
    const { originalAccessToken } = this.state;
    const { accessToken: updatedAccessToken, deviceId } = this.props;

    if (updatedAccessToken && updatedAccessToken !== originalAccessToken) {
      this.setState({ originalAccessToken: updatedAccessToken });

      if (window.Spotify !== null && !deviceId) {
        this.player = new window.Spotify.Player({
          name: "Matt's Spotify Player",
          getOAuthToken: cb => { cb(updatedAccessToken); },
        });

        this.createEventHandlers();

        // Connect to the player!
        this.player.connect();
      }
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.app.accessToken,
    deviceId: state.app.deviceId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpotifyPlayer);