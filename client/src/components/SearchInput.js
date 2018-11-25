import React from 'react';

import SearchIcon from './SearchIcon';

const SearchInput = (props) => {
  const { searchTerm, debounceSearch, setSearchTerm } = props;

  const onInputChange = (value) => {
    setSearchTerm(value);
    debounceSearch(value);
  }

  return (
    <div className="search">
      <div className="search__input-wrapper">
        <input className="search__input" type="text" onChange={e => onInputChange(e.target.value)} value={searchTerm} placeholder="Search for anything..." />
        <div className="search__icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;