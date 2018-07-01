/**
 * Fetch and display spotify categories
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import categoriesActions from '../actions/categoriesActions';
import CardContainer from './CardContainer';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { categoriesActions: { fetchCategories }, categoriesArr } = this.props;

    if (!categoriesArr.length) fetchCategories();
  }

  render() {
    const { categoriesArr } = this.props;

    return (
      <div>
        <CardContainer categoriesArr={categoriesArr} />
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