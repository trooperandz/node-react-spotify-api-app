/**
 * Render play and pause icons in the track listing table
 */

import React, { PureComponent } from 'react';

import PlayIcon from '../components/PlayIcon';
import PauseIcon from '../components/PauseIcon';

class PlayIconContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePlayClick() {
    const { trackUri, trackUriArr, handlePlayClick } = this.props;

    // Type of play to provide the play instruction (we use a track uri array).
    // Sometimes we play single tracks; other times we play an entire album or playlist.
    let context;

    if (trackUri) {
      context = trackUri;
    } else if (trackUriArr) {
      context = trackUriArr;
    }

    handlePlayClick(context);
  }

  handlePauseClick() {
    const { handlePauseClick } = this.props;

    handlePauseClick();
  }

  render() {
    const {
      playerState,
      playlistObj,
      trackUri,
      trackUriArr,
      playType, // used to differentiate the play icon next to the main playlist heading
    } = this.props;

    let shouldShowPauseIcon = false; // the icon next to each track or the actively
    let shouldShowDetailContainerPauseIcon = false; // the icon next to the main playlist header

    // Compare actively playing vs last played for determination of play/pause icon
    // Note: albumUri for a "playlist" will be different for every single track in the track table
    if (playerState && playerState.hasOwnProperty('track_window')) {
      const {
        paused,
        track_window: {
          current_track: { uri: currentTrackUri } = {},
        },
      } = playerState;

      if (playlistObj && playlistObj.hasOwnProperty('trackUriArr')) {
        const { trackUriArr } = playlistObj;

        shouldShowDetailContainerPauseIcon = trackUriArr.some(trackUri => trackUri === currentTrackUri);
      }

      if (!paused && (
          trackUri === currentTrackUri
          || playType === 'play-all' && shouldShowDetailContainerPauseIcon
      )) {
        shouldShowPauseIcon = true;
      }
    }

    if (shouldShowPauseIcon) {
      return <PauseIcon onClickPause={this.handlePauseClick} />;
    } else {
      return <PlayIcon onClickPlay={this.handlePlayClick} />;
    }
  }
}

export default PlayIconContainer;