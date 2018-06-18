import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import NewReleaseContainer from './containers/NewReleaseContainer';
import MyPlaylistsContainer from './containers/MyPlaylistsContainer';
import SavedMusicContainer from './containers/SavedMusicContainer';
import GenresContainer from './containers/GenresContainer';
import DetailContainer from './containers/DetailContainer';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={NewReleaseContainer}></Route>
          <Route path="/my-playlists" component={MyPlaylistsContainer}></Route>
          <Route path="/saved-music" component={SavedMusicContainer}></Route>
          <Route path="/genres" component={GenresContainer}></Route>
          <Route path="/detail" component={DetailContainer}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;