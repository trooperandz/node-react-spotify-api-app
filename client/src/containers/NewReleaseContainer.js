import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import newReleaseActions from '../actions/newReleaseActions';
import CardContainer from './CardContainer';

class NewReleaseContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { newReleaseActions, albumArr } = this.props;
    console.log('componentDidMount ran; props = ', this.props);
    if (!albumArr.length) {
      newReleaseActions.fetchNewReleases();
    }
  }
  
  render() {
    const { albumArr } = this.props;
    console.log('render ran; props = ', this.props);
    if (albumArr && albumArr.length) {
      return (
        <div>
          <CardContainer albumArr={albumArr} />
        </div>
      );
    }

    return null;
  }
}

NewReleaseContainer.propTypes = {
  albumArr: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    albumArr: state.albumArr,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newReleaseActions: bindActionCreators(newReleaseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewReleaseContainer);