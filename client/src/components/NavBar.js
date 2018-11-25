import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <NavLink exact className="navbar__link" to="/"><i className="fas fa-chart-bar"></i> New Releases</NavLink>
        {/*<NavLink className="navbar__link" to="/my-playlists">My Playlists</NavLink>*/}
        <NavLink className="navbar__link" to="/categories"><i className="fas fa-book-open"></i> Categories</NavLink>
        <NavLink className="navbar__link" to="/detail"><i className="fas fa-headphones-alt"></i> Now Playing</NavLink>
        <NavLink className="navbar__link" to="/search"><i className="fas fa-search"></i> Search</NavLink>
      </div>
    );
  }
}

export default NavBar;