/**
 * Create the side nav, used by several views
 */

import React from 'react';

const SideNav = (props) => {
  const { handleSelect, selectedId, selectionArr, title } = props;

  // TODO: not the best for performance to bind the handleCountrySelect fn for every iteration
  const renderList = () => {
    const listItems = selectionArr.map(({ name, id }) => {
      const activeClassName = (selectedId === id ? 'active' : '');

      return (
        <li
          className={`side-nav__list-item ${activeClassName}`}
          key={id}
          onClick={() => handleSelect(id)}>
          {name}
        </li>
      );
    });

    return listItems;
  };

  return (
    <div className="side-nav">
      <div className="side-nav__title">{title}</div>
      <ul className="side-nav__list">
        {renderList()}
      </ul>
    </div>
  );
}

export default SideNav;