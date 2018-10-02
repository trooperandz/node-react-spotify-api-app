/**
 * Create the side nav, used by several views
 */

import React from 'react';

const SideNav = (props) => {
  // navType used to flag current view for dictating click action param
  const { handleSelect, selectedId, selectionArr, title, navType } = props;

  // TODO: not the best for performance to bind the handleCountrySelect fn for every iteration
  const renderList = () => {
    const listItems = selectionArr.map(({ name, id }) => {
      const activeClassName = (selectedId === id ? 'active' : '');
      let clickParam;

      // Passed param will vary depending on what type of view our nav is residing in
      switch(navType) {
        case 'new-release-market':
          clickParam = id;
          break;
        case 'album-search':
          clickParam = name;
          break;
        default:
          break;
      }

      return (
        <li
          className={`side-nav__list-item ${activeClassName}`}
          key={id}
          onClick={() => handleSelect(clickParam)}>
          {name}
        </li>
      );
    });

    return listItems;
  };

  return (
    <div className="side-nav">
      <div className="side-nav__img"></div>
      <div className="side-nav__title">tuneIn</div>
      <div className="side-nav__header">{title}</div>
      <ul className="side-nav__list">
        {renderList()}
      </ul>
    </div>
  );
}

export default SideNav;