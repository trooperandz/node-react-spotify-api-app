/**
 * Fetch and display new releases
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import newReleaseActions from '../actions/newReleaseActions';
import CardContainer from './CardContainer';
import SideNav from '../components/SideNav';

class NewReleaseContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCountrySelect = this.handleCountrySelect.bind(this);
  }

  // Fetch the new releases with the default country select state
  componentDidMount() {
    const { newReleaseActions: { fetchNewReleases }, selectedCountryId, albumArr } = this.props;

    // Don't send another api call on mount if we already have previous results
    if (albumArr && albumArr.length) return null;

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

  // Trigger new release fetch when sidenav country selection occurs
  handleCountrySelect(countryId) {
    const { newReleaseActions: { fetchNewReleases, setCountryId } } = this.props;

    setCountryId(countryId);
    fetchNewReleases(countryId);
  }

  render() {
    const { albumArr, selectedCountryId } = this.props;

    if (albumArr && albumArr.length) {
      return (
        <Fragment>
          <SideNav
            title='Markets'
            handleSelect={this.handleCountrySelect}
            selectedId={selectedCountryId}
            selectionArr = {this.getCountrySelectArr()}
          />
          <div className="content">
            <CardContainer newReleaseArr={albumArr} />
          </div>
        </Fragment>
      );
    }

    return null;
  }
}

NewReleaseContainer.propTypes = {
  albumArr: PropTypes.array.isRequired,
  selectedCountryId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  console.log('state in NewReleaseContainer mapStateToProps: ', state);
  return {
    albumArr: state.newReleases.albumArr,
    selectedCountryId: state.newReleases.selectedCountryId,
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