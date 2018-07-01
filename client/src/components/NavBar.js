import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <NavLink exact className="navbar__link" to="/">New Releases</NavLink>
        <NavLink className="navbar__link" to="/my-playlists">My Playlists</NavLink>
        <NavLink className="navbar__link" to="/saved-music">Saved Music</NavLink>
        <NavLink className="navbar__link" to="/categories">Categories</NavLink>
      </div>
    );
  }
}

export default NavBar;