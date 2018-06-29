import React from 'react';
import './SignUpForm.scss';

import { connect } from 'react-redux';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../redux/currentLocation';
import { setMapError, clearErrors } from '../../redux/landingFormErrors';

import SetPositionOnMapModal from '../_common/maps/SetPositionOnMapModal';

class SignUpForm extends React.Component {
  // props: {
  //   nameError = {props.nameError}
  //   emailError = {props.emailError}
  //   passwordError = {props.passwordError}
  //   passwordCheckError = {props.passwordCheckError}
  //   submitError = {this.props.submitError}
  // };

  state = {
    showMapModal: false,
  }

  setShowMapModal = (value) => {
    this.setState(() => ({ showMapModal: value }));
  };

  submitMapModal = (place, location, address) => {

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

  render() {
    return (
      <div className = "center">
        <span className = "error">{this.props.submitError}</span>

        <div className = "note max-width40">
          {'Please avoid using the following reserved characters: <, >, \\, \', ", and &.'}
        </div>

        <form className = "landing__sign-up-form row">

          {/* left side */}
          <div className = "container flex-fill-space">
            <div className = "property">
              <div className = "key">Name:</div>
              <input
                className = "input"
                type = "text"
                name = "name"
                placeholder = "May Flower"
              />
              <span className = "error width15">{(this.props.emailError) ? this.props.emailError : this.props.nameError}</span>
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

              <span className = "error width15">{this.props.passwordError}</span>
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

              <span className = "error width15">{this.props.passwordCheckError}</span>
            </div>

            <div className = "property rem-above">

              <div className = "key">Home Location:</div>

              <div className = "center-vertically">
                <div
                  className = "button width15 background-blue"
                  onClick = {this.setShowMapModal.bind(this, true)}
                >
                  Find on map
                </div>
              </div>

            </div>

            <div className = "property">
              <div className = "note--no-margin max-width40">
                Your location is only used to calculate distance from events. The more specific, the more accurate distances will be, but an approximate location is fine.
              </div>
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
            </div>

            <div className = "property">
              <div className = "key">Password (6+ long):</div>
              <input
                className = "input"
                type = "password"
                name = "password"
                placeholder = "loopyfish%"
              />
            </div>

            <div className = "property">
              <div className = "key">Password again:</div>
              <input
                className = "input"
                type = "password"
                name = "passwordCheck"
                placeholder = "loopyfish%"
              />
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

      </div>
    );
  };
};

const mapStateToProps = (reduxState) => ({
  placeError: reduxState.eventsFormErrorsReducer.placeError,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
