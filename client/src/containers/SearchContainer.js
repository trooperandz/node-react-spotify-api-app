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
    this.handleSearchHistorySelect = this.handleSearchHistorySelect.bind(this);
  }

  componentDidMount() {
    const { searchActions: { fetchSearchHistory } } = this.props;

    fetchSearchHistory();
  }

  onSearchInputChange(searchTerm) {
    const { searchActions: { fetchSearchResults } } = this.props;

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
    const { searchHistoryArr } = this.props;

    if (!searchHistoryArr) return [ { name: 'No search history...', id: '' } ];

    return searchHistoryArr;
  }

  // Kick off another api search & save search term state if user clicks a side nav search item
  handleSearchHistorySelect(searchTerm) {
    const { searchActions: { fetchSearchResults, setSearchTerm } } = this.props;

    fetchSearchResults(searchTerm);
    setSearchTerm(searchTerm);
  }

  render() {
    const { searchResultsArr, searchTerm } = this.props;

    // TODO: this doesn't seem to work...
    const debounceSearch = _.debounce((term) => { this.onSearchInputChange(term) }, 1500);

    return (
      <Fragment>
        <SideNav
          title='Recent Searches'
          navType='album-search'
          selectionArr={this.getSearchHistoryArr()}
          handleSelect={this.handleSearchHistorySelect}
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
    searchHistoryArr: state.search.searchHistoryArr,
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
