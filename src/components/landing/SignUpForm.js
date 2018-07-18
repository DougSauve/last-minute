import React from 'react';
import './SignUpForm.scss';

import { connect } from 'react-redux';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../redux/currentLocation';
import { setMapError, clearErrors } from '../../redux/landingFormErrors';
import { setSubmitError } from '../../redux/events';

import SetPositionOnMapModal from '../_common/maps/SetPositionOnMapModal';
import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class SignUpForm extends React.Component {
  // props: {
  //   signUp = {this.signUp}
  // closeSignUpModal = {this.closeSignUpModal}
  //
  // nameError = {this.props.nameError}
  // emailError = {this.props.emailError}
  // passwordError = {this.props.passwordError}
  // passwordCheckError = {this.props.passwordCheckError}
  //
  // submitError = {this.props.submitError}
  // };

  state = {
    showMapModal: false,
  }

  componentDidMount() {
    this.props.setSubmitError({});
    this.props.clearErrors();

    document.onkeydown = (e) => {
      handleKeyboardEvents(['enter', this.props.signUp], ['escape', this.props.closeSignUpModal], e);
    };
  };
  componentDidUpdate() {
    if (!this.state.showMapModal) {
      document.onkeydown = (e) => {
          handleKeyboardEvents(['enter', this.props.signUp], ['escape', this.props.closeSignUpModal], e);
      };
    }
  };
  componentWillUnmount() {
    document.onkeydown = () => {};
  };

  setShowMapModal = (value) => {
    this.setState(() => ({ showMapModal: value }));
  };

  submitMapModal = (place, location, address) => {

    place = place.trim();

    this.props.clearErrors();
    let errorsPresent = false;

    if (!place || parseInt(place) === parseInt(place)) {
      this.props.setMapError('Please enter a name for this place.');
      errorsPresent = true;
    };

    if (!location || !location.lat || !location.lng) {
      this.props.setMapError('Error retrieving coordinates. Please reposition the map marker.');
      errorsPresent = true;
    };

    if (location.lat - 1 === NaN || location.lng - 1 === NaN) {
      this.props.setMapError('Type error. Please fire the system administrator.');
      errorsPresent = true;
    };

    if (!address) {
      this.props.setMapError('Please enter an address or choose a location on the map.');
      errorsPresent = true;
    };

    //if no errors, close the modal and leave the info in state
    if (!errorsPresent) this.setShowMapModal(false);
  };

  cancelMapModal = () => {
    this.props.clearErrors();

    this.setShowMapModal(false);
    this.props.setCurrentPlace('');
    this.props.setCurrentCoordinates({ lat: null, lng: null });
    this.props.setCurrentAddress('');
  };

  mountMap = () => {
    this.setShowMapModal(false);
    this.setShowMapModal(true);
  };

  render() {
    return (
      <div className = "modal-item-container scrollable sign-up-container">

        <div className = "header-modal">
          <div className = "landing__header">
            <span className = "space-after">Welcome to LastMinute.</span>
            <span>Let's get you connected.</span>
          </div>
        </div>

        <div className = "center">
          <span className = "error">{this.props.submitError}</span>

          <div className = "note max-width40">
            {'Please avoid using the following reserved characters: <, >, \\, \', ", and &.'}
          </div>

          <form className = "landing__sign-up-form">

            {/* first row */}
            <div className = "landing__first-row">

              {/* left side */}
              <div className = "container flex-fill-space">
                <div className = "property">
                  <div className = "key">Name:</div>
                  <input
                    className = "input"
                    type = "text"
                    name = "name"
                    placeholder = "Jamie S"
                    autoFocus
                  />
                  <span className = "error  show-pl rem-before">{this.props.nameError}</span>
                </div>

                <div className = "property">
                  <div className = "key">Age Range:</div>
                  <select
                    className = "input width17"
                    name = "ageRange"
                  >
                    <option value = "1">under 18</option>
                    <option value = "2">18-30</option>
                    <option value = "3">30-45</option>
                    <option value = "4">45-60</option>
                    <option value = "5">60+</option>
                  </select>
                </div>

                <div className = "property">
                  <div className = "key">Gender:</div>
                  <select
                    className = "input width17"
                    name = "gender"
                  >
                    <option value = "Male">Male</option>
                    <option value = "Female">Female</option>
                    <option value = "Other">Other</option>
                    <option value = "None">Prefer not to say</option>
                  </select>
                </div>

              </div>

              {/* right side */}
              <div className = "container flex-fill-space">
                <div className = "property">
                  <div className = "key">Email address:</div>
                  <input
                    className = "input"
                    type = "email"
                    name = "email"
                    placeholder = "frozenyak@tibet.com"
                  />

                  <span className = "error  show-pl rem-before">{this.props.emailError}</span>
                </div>

                <div className = "property">
                  <div className = "key">Password (6+ long):</div>
                  <input
                    className = "input"
                    type = "password"
                    name = "password"
                    placeholder = "loopyfish%"
                  />

                  <span className = "error show-pl rem-before">{this.props.passwordError}</span>
                </div>

                <div className = "property">
                  <div className = "key">Password again:</div>
                  <input
                    className = "input"
                    type = "password"
                    name = "passwordCheck"
                    placeholder = "loopyfish%"
                  />
                    <span className = "error show-pl rem-before">{this.props.passwordCheckError}</span>
                </div>

              </div>
            </div>
            {/* ^ end first row */}

            {/* second row - desktop errors */}
            <div className = "show-d rem-before">
              <div className = "error">{this.props.nameError}</div>
              <div className = "error">{this.props.emailError}</div>
              <div className = "error">{this.props.passwordError}</div>
              <div className = "error">{this.props.passwordCheckError}</div>
            </div>

            {/* third row */}
            <div className = "row">
              <div className = "container flex-fill-space">
                <div className = "property rem-above">

                  <div className = "key">Home Location:</div>

                  <div className = "button-container center-vertically">
                    <div
                      className = "button width15 background-blue"
                      // onClick = {this.setShowMapModal.bind(this, true)}
                      onClick = {this.mountMap}
                    >
                      Find on map
                    </div>

                    <span className = "error">{this.props.homeLocationError}</span>
                  </div>

                </div>

                <div className = "property">
                  <div className = "note--no-margin max-width40">
                    Your location is only used to calculate distance from events. The more specific, the more accurate distances will be, but an approximate location is fine.
                  </div>
                </div>
              </div>

            </div>

          </form>

          {(this.state.showMapModal) &&
            <SetPositionOnMapModal
              submit = {this.submitMapModal}
              cancel = {this.cancelMapModal}
              lat = {this.props.lat}
              lng = {this.props.lng}
              address = {this.props.address}
              setCurrentPlace = {this.props.setCurrentPlace}
              setCurrentAddress = {this.props.setCurrentAddress}
              mapNote = {'Choose a home location on the map or enter an address instead. Your location is only used to calculate distance from events. The more specific, the more accurate distances will be, but an approximate location is fine.'}
              place = {this.props.place}
              mapError = {this.props.mapError}
            />
          }

          <div className = "button-container">
            <div className = "button background-green width15"
              onClick = {this.props.signUp}
            >
              Sign up
            </div>

            <div className = "button background-none width15"
              onClick = {this.props.closeSignUpModal}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (reduxState) => ({
  place: reduxState.currentLocationReducer.place,
  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,

  mapError: reduxState.landingFormErrorsReducer.mapError,
});

const mapDispatchToProps = {
  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,

  setMapError,
  clearErrors,

  setSubmitError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
