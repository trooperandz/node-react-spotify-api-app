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

  // TODO: kick off the db search history call here
  componentDidMount() {
    const { searchActions: { fetchSearchHistory } } = this.props;

    fetchSearchHistory();
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
    const { searchHistoryArr } = this.props;
    console.log('searchHistoryArr: ', searchHistoryArr);
    if (!searchHistoryArr) return [ { name: 'Englebert Humperdink', id: '' } ];

    return searchHistoryArr;
    // return [
    //   { name: 'Alice In Chains', id: '' },
    //   { name: 'MGMT', id: '' },
    //   { name: 'The Killers', id: '' },
    //   { name: 'Nick Drake', id: '' },
    // ];
  }

  // Kick off another api search if user clicks a side nav search item
  handleSearchHistorySelect(searchTerm) {

  }

  render() {
    const { searchResultsArr, searchTerm } = this.props;

    const debounceSearch = _.debounce((term) => { this.onSearchInputChange(term) }, 1500);

    return (
      <Fragment>
        <SideNav
          title='Recent Searches'
          selectionArr = {this.getSearchHistoryArr()}
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
