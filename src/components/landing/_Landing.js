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
import { setUser, setSubmitError, setSubmitSuccess } from '../../redux/user';


import TitleBar from '../_common/TitleBar';
import EventsList from '../_common/EventsList';
import Footer from '../_common/Footer';
import { blacklist } from '../../../utils/sanitize';

import EntryButtonContainer from './EntryButtonContainer';
import Modal from '../_common/modal/_Modal';
import SignUpModal from './SignUpModal';
import LogInModal from './LogInModal';

import './_Landing.scss';

// this page greets users and provides a list of current local events.
// it also show a button for 'sign up' and one for 'log in'. These drop down into forms. (maybe - this might be pretty fancy animation.)

class Landing extends React.Component {

  state = {
    showSignUpModal: false,
    showLogInModal: false,
  };

  setShowSignUpModal = () => {
    this.setState(() => ({ showSignUpModal: true }));
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
    if (this.checkForSignUpErrors(newUser)) return;

    //write user to db
    this.props.socket.emit('createUser', newUser, (err, res) => {
      if (err) {
        this.props.setSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          window.location.pathname = "/index";
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
    };

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
    alert('log in working');
  };

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
        stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };

  render() {
    return (
      <div className = "landing">

        <TitleBar
          showLogin = {true}
          logIn = {this.logIn}
        />
        <EntryButtonContainer
          setShowSignUpModal = {this.setShowSignUpModal}
          setShowLogInModal = {this.setShowLogInModal}
        />

        <EventsList
          firstWordOfClass = "landing"
          limited = {true}
        />

        {(this.state.showSignUpModal) &&
          <Modal>
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
              closeModal = {this.closeModal}/>
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

  submitSuccess: reduxStore.userReducer.submitSuccess,
  submitError: reduxStore.userReducer.submitError,
  user: reduxStore.userReducer.user,

});

const mapDispatchToProps = {
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  clearErrors,

  setUser,
  setSubmitError,
  setSubmitSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
