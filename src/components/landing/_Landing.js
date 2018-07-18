import React from 'react';
import validator from 'validator';

import { connect } from 'react-redux';
import {
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  setHomeLocationError,
  clearErrors,
} from '../../redux/landingFormErrors';
import { setUser } from '../../redux/user';
import { setSubmitError } from '../../redux/events';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../redux/currentLocation';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';
import { blacklist } from '../../../utils/sanitize';

import Modal from '../_common/modal/_Modal';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

import './_Landing.scss';

class Landing extends React.Component {

  state = {
    showSignUpModal: false,
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['enter', this.logIn]);
  };
  componentDidUpdate() {
    if (!this.state.showSignUpModal) {
      document.onkeydown = (e) => {
          handleKeyboardEvents(['enter', this.logIn], ['escape', this.closeModal], e);
      };
    }
  };

  setShowSignUpModal = () => {
    this.setState(() => ({ showSignUpModal: true }));
  };
  closeSignUpModal = () => {
    this.setState(() => ({ showSignUpModal: false }));
  };

  signUp = () => {
    //collect data from form
    const form = document.getElementsByClassName('landing__sign-up-form')[0];

    const homeLocation = {
      name: this.props.place,
      location: {lat: this.props.lat, lng: this.props.lng},
      address: this.props.address,
    };

    const newUser = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      passwordCheck: form.elements.passwordCheck.value,
      ageRange: form.elements.ageRange.value,
      gender: form.elements.gender.value,
    };


    if (this.checkForSignUpErrors(newUser, homeLocation)) {
      this.props.setSubmitError('Please correct the errors below.');

      document.getElementsByClassName('scrollable')[0].scrollTop = 0;
      return;
    };

    //write user to db
    this.props.socket.emit('createUser', newUser, (err, res) => {
      if (err) {
        this.props.setSubmitError({submitError: err});
      } else {
        //set user's homeLocation and currentHomeLocation, then clear it from redux currentLocation state
        this.props.socket.emit('addHomeLocationToUser', {user: res, homeLocation}, (err2, res2) => {
          this.props.socket.emit('setCurrentHomeLocation', {user: res2, homeLocation: res2.homeLocations[0]}, (err3, res3) => {
            this.props.setCurrentPlace('');
            this.props.setCurrentCoordinates({ lat: null, lng: null });
            this.props.setCurrentAddress('');

            //set session user
            this.props.socket.emit('setCurrentUser', res3, () => {
              this.props.socket.emit('setFirstTimeUser');
              window.location.pathname = "/index";
            });
          });
        });
      };
    });
  };
  checkForSignUpErrors = (user, homeLocation) => {

    this.props.clearErrors();
    let errorsPresent = false;

    const validateName = blacklist(user.name, '<', '>', '/', '\\', '&', '\'', '"');

    if (validateName !== false) {

      (validateName.length === 1) ?
      this.props.setNameError(`Please remove this character from this field: ${validateName}`) :
      this.props.setNameError(`Please remove these characters from this field: ${validateName}`);

      errorsPresent = true;

    } else if (user.name.length < 1 || !isNaN(user.name)) {

      this.props.setNameError('Please enter your name.');
      errorsPresent = true;
    };

    const validateEmail = blacklist(user.email, '<', '>', '/', '\\', '&', '\'', '"');
    if (validateEmail !== false) {

      (validateEmail.length === 1) ?
      this.props.setEmailError(`Please remove this character from this field: ${validateEmail}`) :
      this.props.setEmailError(`Please remove these characters from this field: ${validateEmail}`);

      errorsPresent = true;
    } else if (!validator.isEmail(user.email)) {
      this.props.setEmailError('Please enter a valid email address.');
      errorsPresent = true;
    }; // else if () //email is already in use

    const validatePassword = blacklist(user.password, '<', '>', '/', '\\', '&', '\'', '"');

    if (validatePassword !== false) {

      this.props.setPasswordError(
        'Please avoid using reserved characters in this field (see above for a list.)');

      errorsPresent = true;
    } else if (user.password.length < 6) {
      this.props.setPasswordError('Password must be at least 6 characters long.');
      errorsPresent = true;
    };

    const validatePasswordCheck = blacklist(user.passwordCheck, '<', '>', '/', '\\', '&', '\'', '"');

    if (validatePasswordCheck !== false) {
      this.props.setPasswordError(
        'Please avoid using reserved characters in this field (see above for a list.)');

      errorsPresent = true;
    } else if (user.password !== user.passwordCheck) {
        this.props.setPasswordCheckError('Paswords do not match.');
        errorsPresent = true;
    };

    if (!homeLocation.address || !homeLocation.location.lat || !homeLocation.location.lng || !homeLocation.name) {
      this.props.setHomeLocationError('Please choose a home location.');
      errorsPresent = true;
    };

    return errorsPresent;
  };

  logIn = () => {
    const form = document.getElementsByClassName('landing__log-in-form')[0];
    const creds = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    this.props.socket.emit('validateUser', creds, (err, user) => {
      if (err) {
        this.props.setSubmitError({submitError: err});
      } else {
        this.props.setUser(user);
        this.props.socket.emit('setCurrentUser', user, () => {
          this.closeModal();
          window.location.pathname = '/index';
        });
      };
    });
  };

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
        stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
    this.props.clearErrors();
    this.props.setSubmitError('');
  };

  render() {
    return (
      <div className = "landing">

        <TitleBar />

        <div className = "landing__left-box">
          <div className = "landing__left-box__photo">
            <img src = "./landing-photo.png" />
          </div>
        </div>

        <div className = "landing__right-box">
          <div className = "landing__title-box">
            <div className = "landing__title-box__title">LastMinute</div>
            <div className = "landing__title-box__phrase">No plans? No problem.</div>
          </div>

          <div className = "landing__entry-box">
            <LoginForm
              submitError = {this.props.submitError}
              setShowSignUpModal = {this.setShowSignUpModal}
              logIn = {this.logIn}
            />
          </div>
        </div>

        {(this.state.showSignUpModal) &&
          <Modal
            close = {this.closeSignUpModal}
          >
            <SignUpForm
              signUp = {this.signUp}
              closeSignUpModal = {this.closeSignUpModal}

              nameError = {this.props.nameError}
              emailError = {this.props.emailError}
              passwordError = {this.props.passwordError}
              passwordCheckError = {this.props.passwordCheckError}
              homeLocationError = {this.props.homeLocationError}

              submitError = {this.props.submitError}
              setSubmitError = {this.props.setSubmitError}
            />
          </Modal>
        }

        <Footer />

      </div>
    );
  };
};

const mapStateToProps = (reduxStore) => ({
  nameError: reduxStore.landingFormErrorsReducer.nameError,
  emailError: reduxStore.landingFormErrorsReducer.emailError,
  passwordError: reduxStore.landingFormErrorsReducer.passwordError,
  passwordCheckError: reduxStore.landingFormErrorsReducer.passwordCheckError,
  homeLocationError: reduxStore.landingFormErrorsReducer.homeLocationError,

  submitError: reduxStore.eventsReducer.submitError,
  user: reduxStore.userReducer.user,

  place: reduxStore.currentLocationReducer.place,
  lat: reduxStore.currentLocationReducer.lat,
  lng: reduxStore.currentLocationReducer.lng,
  address: reduxStore.currentLocationReducer.address,

  events: reduxStore.eventsReducer.events,
});

const mapDispatchToProps = {
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  setHomeLocationError,
  clearErrors,

  setUser,

  setSubmitError,

  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
