import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import NewReleaseContainer from './containers/NewReleaseContainer';
import MyPlaylistsContainer from './containers/MyPlaylistsContainer';
import SavedMusicContainer from './containers/SavedMusicContainer';
import CategoriesContainer from './containers/CategoriesContainer';
import DetailContainer from './containers/DetailContainer';
import SearchContainer from './containers/SearchContainer';
import TestTable from './containers/TestTable';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content-wrapper">
          <Switch>
            {/*<Route exact path="/" component={TestTable}></Route>*/}
            <Route exact path="/" component={NewReleaseContainer}></Route>
            <Route path="/my-playlists" component={MyPlaylistsContainer}></Route>
            {/*<Route path="/saved-music" component={SavedMusicContainer}></Route>*/}
            <Route path="/categories" component={CategoriesContainer}></Route>
            <Route path="/detail" component={DetailContainer}></Route>
            <Route path="/search" component={SearchContainer}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;