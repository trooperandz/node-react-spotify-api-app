/**
 *  Main profile navbar avatar and dropdown
 */

import React, { Component } from 'react';

class ProfileAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownActive: false,
    };

    this.onClickAvatar = this.onClickAvatar.bind(this);
  }

  // Activate/deactivate the dropdown
  onClickAvatar() {
    const { isDropdownActive } = this.state;

    this.setState({
      isDropdownActive: !isDropdownActive,
    });
  }

  render() {
    const { isDropdownActive } = this.state;

    const dropdownActiveClass = isDropdownActive ? 'dropdown--active' : '';

    return (
      <div onClick={this.onClickAvatar} className="avatar">
        <div className={`dropdown ${dropdownActiveClass}`}>
          <ul className="dropdown__list">
            <li className="dropdown__list-item">
              <span className="dropdown__icon"><i className="far fa-user"></i></span>
              <a href="https://www.mtholla.com" target="_blank" className="dropdown__title">about matt h</a>
            </li>
            <li className="dropdown__list-item">
              <span className="dropdown__icon"><i className="fas fa-clipboard-list"></i></span>
              <a href="https://www.medium.com/mtholla" target="_blank" className="dropdown__title">blog site</a>
            </li>
            <li className="dropdown__list-item">
              <span className="dropdown__icon"><i className="fas fa-sign-out-alt"></i></span>
              <a href="https://www.linkedin.com/in/matt-holland/" target="_blank" className="dropdown__title">linkedIn profile</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileAvatar;