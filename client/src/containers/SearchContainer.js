/**
 * Displays all search results
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import searchActions from '../actions/searchActions';
import CardContainer from './CardContainer';
import SearchIcon from '../components/SearchIcon';
import SearchInput from '../components/SearchInput';
import SideNav from '../components/SideNav';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  onSearchInputChange(searchTerm) {
    const { searchActions: { fetchSearchResults } } = this.props;
    console.log('onSearchInputChange fired. searchTerm = ', searchTerm);

    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }

    return null;
  }

  setSearchTerm(searchTerm) {
    const { searchActions: { setSearchTerm } } = this.props;

    setSearchTerm(searchTerm);
  }

  getSearchHistoryArr() {
    return [
      { name: 'Alice In Chains', id: '' },
      { name: 'MGMT', id: '' },
      { name: 'The Killers', id: '' },
      { name: 'Nick Drake', id: '' },
    ];
  }

  render() {
    const { searchResultsArr, searchTerm } = this.props;

    const debounceSearch = _.debounce((term) => { this.onSearchInputChange(term) }, 1500);

    return (
      <Fragment>
        <SideNav
          selectionArr = {this.getSearchHistoryArr()}
        />
        <div className="content">
          <SearchInput
            debounceSearch={debounceSearch}
            setSearchTerm={this.setSearchTerm}
            searchTerm={searchTerm}
          />
          <CardContainer searchResultsArr={searchResultsArr} />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.search.searchTerm,
    searchResultsArr: state.search.searchResultsArr,
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
)(SearchContainer);
