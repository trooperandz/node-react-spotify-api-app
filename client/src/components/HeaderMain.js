/**
 * Main header in dashboard content area
 */

import React from 'react';

const HeaderMain = (props) => {

  return (
    <div className="header-main">
      <h2 className="header-main__heading">New Releases - Japan</h2>
      <div className="header-main__pagination">Showing 20 of 20 results</div>
    </div>
  );
}

export default HeaderMain;