/**
 * Create the side nav, used by several views
 */

import React from 'react';

// Render the side nav list items
function renderList(selectionArr, selectedId, navType, handleSelect) {
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
        onClick={() => handleSelect(clickParam, selectedObj, itemType)}>
        {name}
      </li>
    );
  });

  return listItems;
};

// Change side nav title icon depending on view type
function renderTitleIcon(navType) {
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

  return (
    <i className={`fas ${iconName}`}></i>
  );
}

const SideNav = (props) => {
  // navType used to flag current view for dictating click action param, & title icon
  const {
    handleSelect,
    selectedId,
    selectionArr,
    title,
    navType,
  } = props;

  return (
    <div className="side-nav">
      <div className="side-nav__img"></div>
      <div className="side-nav__title">tuneIn</div>
      <div className="side-nav__header">{title}
        {renderTitleIcon(navType)}
      </div>
      <ul className="side-nav__list">
        {renderList(selectionArr, selectedId, navType, handleSelect)}
      </ul>
    </div>
  );
}

export default SideNav;