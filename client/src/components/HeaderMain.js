/**
 * Main header in dashboard content area
 */

import React from 'react';

const HeaderMain = (props) => {

  return (
    <div className="header-main">
      <div className="header-main__wrapper">
        <h2 className="header-main__heading">New Releases - Japan</h2>
      </div>
      <div className="header-main__wrapper">
        <p className="header-main__pagination">Showing 20 of 20 results</p>
      </div>
    </div>
  );
}

export default HeaderMain;