/**
 * Fetch and display spotify categories
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import categoriesActions from '../actions/categoriesActions';
import SideNav from '../components/SideNav';
import CardContainer from './CardContainer';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: 'jazz',
    };

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    const { categoriesActions: { fetchCategories } } = this.props;
    const { selectedCategoryId } = this.state;

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

  handleCategorySelect(categoryId) {
    const { categoriesActions: { fetchCategories } } = this.props;
    console.log('selected category: ', categoryId);
    this.setState({ selectedCategoryId: categoryId });
    fetchCategories(categoryId);
  }

  render() {
    const { categoriesArr } = this.props;
    const { selectedCategoryId } = this.state;

    return (
      <div className="flex-container">
        <SideNav
          title='Playlists'
          handleSelect={this.handleCategorySelect}
          selectedId={selectedCategoryId}
          selectionArr={this.getCategorySelectArr()}
        />
        <CardContainer
          categoriesArr={categoriesArr}
        />
      </div>
    );
  }
}

CategoriesContainer.propTypes = {
  categoriesArr: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    categoriesArr: state.categoriesArr,
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