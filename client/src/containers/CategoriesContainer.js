/**
 * Fetch and display spotify categories
 */

import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import categoriesActions from '../actions/categoriesActions';
import SideNav from '../components/SideNav';
import CardContainer from './CardContainer';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    const { categoriesActions: { fetchCategories }, selectedCategoryId, categoriesArr } = this.props;

    // Don't send another api call on mount if we already have previous results
    if (categoriesArr && categoriesArr.length) return null;

    fetchCategories(selectedCategoryId);
  }

  getCategorySelectArr() {
    return [
      { id: 'rock', name: 'Rock' },
      { id: 'jazz', name: 'Jazz' },
      { id: 'party', name: 'Party' },
      { id: 'roots', name: 'Roots' },
      { id: 'classical', name: 'Classical' },
      { id: 'decades', name: 'Decades' },
      { id: 'hiphop', name: 'Hip Hop' },
      { id: 'mood', name: 'Mood' },
      { id: 'workout', name: 'Workout' },
      { id: 'focus', name: 'Focus' },
      { id: 'country', name: 'Country' },
      { id: 'pop', name: 'Pop' },
      { id: 'gaming', name: 'Gaming' },
      { id: 'dinner', name: 'Dinner' },
    ];
  }

  handleCategorySelect(selectedCategoryId) {
    const { categoriesActions: { fetchCategories, setCategoryId } } = this.props;

    setCategoryId(selectedCategoryId);
    fetchCategories(selectedCategoryId);

  }

  render() {
    const { categoriesArr, selectedCategoryId } = this.props;

    return (
      <Fragment>
        <SideNav
          title='Playlists'
          handleSelect={this.handleCategorySelect}
          selectedId={selectedCategoryId}
          selectionArr={this.getCategorySelectArr()}
          navType='playlist'
        />
        <div className="content">
          <CardContainer
            categoriesArr={categoriesArr}
          />
        </div>
      </Fragment>
    );
  }
}

CategoriesContainer.propTypes = {
  categoriesArr: PropTypes.array.isRequired,
  selectedCategoryId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    categoriesArr: state.categories.categoriesArr,
    selectedCategoryId: state.categories.selectedCategoryId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);