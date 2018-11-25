/**
 * Create the side nav, used by several views
 */

import React from 'react';

// Render the side nav list items
function renderList(selectionArr, selectedId, navType, handleSelect) {
  const listItems = selectionArr.map(({ name, id, type }) => {
    const activeClassName = (selectedId === id ? 'active' : '');
    let clickParam;

    // Passed param will vary depending on what type of view our nav is residing in
    // Note: type is used to determine relevant fetch action for DetailView side nav clicks (playlist/album)
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
        key={id}
        onClick={() => handleSelect(clickParam, type)}>
        {name}
      </li>
    );
  });

  return listItems;
};

const SideNav = (props) => {
  // navType used to flag current view for dictating click action param
  const { handleSelect, selectedId, selectionArr, title, navType } = props;

  return (
    <div className="side-nav">
      <div className="side-nav__img"></div>
      <div className="side-nav__title">tuneIn</div>
      <div className="side-nav__header">{title} <i className="fas fa-map"></i></div>
      <ul className="side-nav__list">
        {renderList(selectionArr, selectedId, navType, handleSelect)}
      </ul>
    </div>
  );
}

export default SideNav;