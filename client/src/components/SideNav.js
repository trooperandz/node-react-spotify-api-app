/**
 * Create the side nav, used by all main container views
 */

import React, { Component } from 'react';

class SideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavActive: false,
    };

    this.handleSideNavClose = this.handleSideNavClose.bind(this);
    this.handleSideNavSelect = this.handleSideNavSelect.bind(this);
  }

  // Render the side nav list items
  // navType used to flag current view for dictating click action param, & title icon
  renderListItems() {
    const {
      navType,
      selectedId,
      selectionArr,
    } = this.props;

    const listItems = selectionArr.map((selectedObj, i) => {
      const { name, id, itemType } = selectedObj;
      const activeClassName = (selectedId === id ? 'active' : '');
      let clickParam;

      // Passed param will vary depending on what type of view our nav is residing in
      // name is used for card container title display
      switch(navType) {
        case 'new-release-market':
          clickParam = id;
          break;
        case 'album-search':
          clickParam = name;
          break;
        case 'playlist':
          clickParam = id;
        case 'detail-container':
          clickParam = id;
        default:
          break;
      }

      return (
        <li
          className={`side-nav__list-item ${activeClassName}`}
          key={i}
          onClick={() => this.handleSideNavSelect(clickParam, selectedObj, itemType)}>
          {name}
        </li>
      );
    });

    return listItems;
  };

  // Change side nav title icon depending on view type
  renderTitleIcon() {
    const { navType } = this.props;

    let iconName;

    switch(navType) {
      case 'new-release-market':
        iconName = 'fa-map';
        break;
      case 'album-search':
        iconName = 'fa-search';
        break;
      case 'playlist':
        iconName = 'fa-list-ul';
        break;
      case 'detail-container':
        iconName = 'fa-play-circle';
        break;
      default:
        iconName = 'fa-map';
        break;
    }

    return <i className={`fas ${iconName}`}></i>;
  }

  // Toggle the true/false state
  handleSideNavClose() {
    const { isSideNavActive } = this.state;

    this.setState({
      isSideNavActive: !isSideNavActive,
    });
  }

  // Execute the passed in handleSelect prop, and close the side nav on item click
  // TODO: this is a good case for a spinner, to delay the close a bit
  handleSideNavSelect(clickParam, selectedObj, itemType) { console.log('clicked...');
    const { handleSelect } = this.props;

    this.setState({
      isSideNavActive: false,
    });

    handleSelect(clickParam, selectedObj, itemType);
  }

  render() {
    const { title } = this.props;
    const { isSideNavActive } = this.state;

    const activeClassName = isSideNavActive ? 'side-nav--active' : null;
    const hiddenStyle = isSideNavActive ? 'hidden' : null;

    return (
      <div className={`side-nav ${activeClassName}`}>
        <i class="far fa-times-circle" onClick={this.handleSideNavClose}></i>
        <div className="side-nav__img"></div>
        <div className="side-nav__title">tuneIn
          <i class={`fas fa-bars ${hiddenStyle}`} onClick={this.handleSideNavClose}></i>
        </div>
        <div className="side-nav__header">{title}
          {this.renderTitleIcon()}
        </div>
        <ul className="side-nav__list">
          {this.renderListItems()}
        </ul>
      </div>
    );
  }
}

export default SideNav;
