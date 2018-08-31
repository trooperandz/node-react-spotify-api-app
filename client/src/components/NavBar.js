import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <NavLink exact className="navbar__link" to="/">New Releases</NavLink>
        {/*<NavLink className="navbar__link" to="/my-playlists">My Playlists</NavLink>*/}
        <NavLink className="navbar__link" to="/categories">Categories</NavLink>
        <NavLink className="navbar__link" to="/detail">Now Playing</NavLink>
        <NavLink className="navbar__link" to="/search">Search</NavLink>
      </div>
    );
  }
}

export default NavBar;