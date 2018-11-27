import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import SpotifyPlayer from './containers/SpotifyPlayer';
import NavBar from './components/NavBar';
import NewReleaseContainer from './containers/NewReleaseContainer';
import CategoriesContainer from './containers/CategoriesContainer';
import DetailContainer from './containers/DetailContainer';
import SearchContainer from './containers/SearchContainer';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <SpotifyPlayer />
        <div className="grid-main">
          <NavBar />
          <Switch>
            <Route exact path="/" component={NewReleaseContainer}></Route>
            <Route path="/categories" component={CategoriesContainer}></Route>
            <Route path="/detail" component={DetailContainer}></Route>
            <Route path="/search" component={SearchContainer}></Route>
          </Switch>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;