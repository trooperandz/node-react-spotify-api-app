import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import searchActions from '../actions/searchActions';
import SearchIcon from './SearchIcon';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
  }

  onSearchInputChange(e) {
    const { searchActions: { setSearchTerm, fetchSearchResults } } = this.props;
    const { target: { value } = {} } = e;

    setSearchTerm(value);

    // TODO: figure out how to debounce this
    fetchSearchResults(value);
  }

  render() {
    const { searchTerm } = this.props;

    return (
      <div className="search">
        <input className="search__input" type="text" onChange={this.onSearchInputChange} value={searchTerm} placeholder="Search by artist or album..." />
        <i className="fas fa-search"></i>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.search.searchTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput);