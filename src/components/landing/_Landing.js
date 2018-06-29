import React from 'react';
import validator from 'validator';

import { connect } from 'react-redux';
import {
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  clearErrors,
} from '../../redux/landingFormErrors';
import { setUser } from '../../redux/user';
import { setSubmitError } from '../../redux/events';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../redux/currentLocation';

import TitleBar from '../_common/TitleBar';
import SampleEvents from './SampleEvents';
import Footer from '../_common/Footer';
import { blacklist } from '../../../utils/sanitize';

import Modal from '../_common/modal/_Modal';
import SignUpModal from './SignUpModal';
import LoginForm from './LoginForm';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

import './_Landing.scss';

// this page greets users and provides a list of current local events.
// it also show a button for 'sign up' and one for 'log in'. These drop down into forms. (maybe - this might be pretty fancy animation.)

class Landing extends React.Component {

  state = {
    showSignUpModal: false,
    showLogInModal: false,
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['enter', this.logIn], ['escape', this.closeModal]);
  };

  setShowSignUpModal = () => {
    this.setState(() => ({ showSignUpModal: true }));
  };
  closeSignUpModal = () => {
    this.setState(() => ({ showSignUpModal: false }));
  };
  setShowLogInModal = () => {
    this.setState(() => ({ showLogInModal: true }));
  };

  signUp = () => {
    //collect data from form
    const form = document.getElementsByClassName('landing__sign-up-form')[0];

    const newUser = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      passwordCheck: form.elements.passwordCheck.value,
      ageRange: form.elements.ageRange.value,
      gender: form.elements.gender.value,
    };

    const homeLocation = {
      name: this.props.place,
      location: {lat: this.props.lat, lng: this.props.lng},
      address: this.props.address,
    };

    if (this.checkForSignUpErrors(newUser)) return;

    //write user to db
    this.props.socket.emit('createUser', newUser, (err, res) => {
      if (err) {
        this.props.setSubmitError({submitError: err});
      } else {
        //set user's homeLocation, then clear it from redux currentLocation state
        this.props.socket.emit('addHomeLocationToUser', {user: res, homeLocation}, (err2, res2) => {
          this.props.setCurrentPlace('');
          this.props.setCurrentCoordinates({ lat: null, lng: null });
          this.props.setCurrentAddress('');

          //set session user
          this.props.socket.emit('setCurrentUser', res2, () => {
            window.location.pathname = "/index";
          });

        });
      };
    });
  };
  checkForSignUpErrors = (user) => {

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
          <div className = "landing__left-box__description">
            <SampleEvents />
          </div>
        </div>

        <div className = "landing__right-box">
          <div className = "landing__title-box">
            <div className = "landing__title-box__title">LastMinute</div>
            <div className = "landing__title-box__phrase">Forgot to make plans? No problem.</div>
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
            <SignUpModal
              signUp = {this.signUp}
              closeModal = {this.closeModal}

              nameError = {this.props.nameError}
              emailError = {this.props.emailError}
              passwordError = {this.props.passwordError}
              passwordCheckError = {this.props.passwordCheckError}

              submitError = {this.props.submitError}
            />
          </Modal>
        }

        {(this.state.showLogInModal) &&
          <Modal>
            <LogInModal
              logIn = {this.logIn}
              closeModal = {this.closeModal}
              submitError = {this.props.submitError}
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

  submitError: reduxStore.eventsReducer.submitError,
  user: reduxStore.userReducer.user,

  place: reduxStore.currentLocationReducer.place,
  lat: reduxStore.currentLocationReducer.lat,
  lng: reduxStore.currentLocationReducer.lng,
  address: reduxStore.currentLocationReducer.address,

});

const mapDispatchToProps = {
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  clearErrors,

  setUser,

  setSubmitError,

  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
