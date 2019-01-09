import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  // App's entry point is Playlists; make sure nav item has active class on initial oauth callback route
  isNavPlaylistLinkActive(match, { pathname }) {
    return (pathname === '/login/callback' || pathname === '/playlists');
  }

  render() {
    return (
      <div className="navbar">
        <NavLink className="navbar__link" to="/newreleases"><i className="fas fa-chart-bar"></i> New Releases</NavLink>
        <NavLink className="navbar__link" isActive={this.isNavPlaylistLinkActive} to="/playlists"><i className="fas fa-book-open"></i> Playlists</NavLink>
        <NavLink className="navbar__link" to="/detail"><i className="fas fa-headphones-alt"></i> Now Playing</NavLink>
        <NavLink className="navbar__link" to="/search"><i className="fas fa-search"></i> Search</NavLink>
      </div>
    );
  }
}

export default NavBar;