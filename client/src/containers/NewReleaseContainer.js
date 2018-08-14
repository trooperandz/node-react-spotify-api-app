/**
 * Fetch and display new releases
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import newReleaseActions from '../actions/newReleaseActions';
import CardContainer from './CardContainer';
import SideNav from '../components/SideNav';

class NewReleaseContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryId: 'US',
    };

    this.handleCountrySelect = this.handleCountrySelect.bind(this);
  }

  // Fetch the new releases with the default country select state
  componentDidMount() {
    const { newReleaseActions: { fetchNewReleases }, albumArr } = this.props;
    const { selectedCountryId } = this.state;

    fetchNewReleases(selectedCountryId);
  }

  // Populates list items in side nav
  getCountrySelectArr() {
    return [
      { name: 'U.K.', id: 'GB' },
      { name: 'Japan', id: 'JP' },
      { name: 'Slovakia', id: 'SK' },
      { name: 'Brazil', id: 'BR' },
      { name: 'U.S.', id: 'US' },
      { name: 'Mexico', id: 'MX' },
      { name: 'Germany', id: 'DE' },
      { name: 'Taiwan', id: 'TW' },
      { name: 'Malta', id: 'MT' },
      { name: 'France', id: 'FR' },
    ];
  }

  // Trigger new release fetch when side nav country selection occurs
  handleCountrySelect(countryId) {
    const { newReleaseActions: { fetchNewReleases } } = this.props;
    console.log('code: ', countryId);
    this.setState({ selectedCountryId: countryId });
    fetchNewReleases(countryId);
  }
  
  render() {
    const { albumArr } = this.props;
    const { selectedCountryId } = this.state;

    if (albumArr && albumArr.length) {
      return (
        <div className="flex-container">
          <SideNav 
            title='Markets'
            handleSelect={this.handleCountrySelect}
            selectedId={selectedCountryId}
            selectionArr = {this.getCountrySelectArr()}
          />
          <CardContainer newReleaseArr={albumArr} />
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