import React from 'react';
import validator from 'validator';

import { connect } from 'react-redux';
import { setUser, setUserSubmitError, setUserSubmitSuccess } from '../../redux/user';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import UserProfileForm from './UserProfileForm';
import Modal from '../_common/modal/_Modal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeEmailModal from './ChangeEmailModal';
import ChangeAgeRangeModal from './ChangeAgeRangeModal';

import VerifyDeleteModal from './VerifyDeleteModal';

import './_Profile.scss';

// the profile page shows the user's profile info in a form, where most things can be updated.
// It shows flags when there are 3 or more, which can be accessed and disputed in a modal.
// It shows buttons to update and delete the profile.

class Profile extends React.Component {
  state = {
    showChangePasswordModal: false,
    showChangeEmailModal: false,
    showChangeAgeRangeModal: false,
    showVerifyDeleteModal: false,
  };

  componentDidMount() {
    this.props.socket.emit('getMyEvent', (event) => {
      this.props.setMyEvent(event);
    });
    this.props.socket.emit('getCurrentUser', (user) => {
      if (!user) return window.location.pathname = '/';
      this.props.setUser(user);
    });
  };

  setShowChangePasswordModal = () => {
    this.setState(() => ({ showChangePasswordModal: true }));
  };
  setShowChangeEmailModal = () => {
    this.setState(() => ({ showChangeEmailModal: true }));
  };
  setShowChangeAgeRangeModal = () => {
    this.setState(() => ({ showChangeAgeRangeModal: true }));
  };
  setShowVerifyDeleteModal = () => {
    this.setState(() => ({ showVerifyDeleteModal: true }));
  };

  requestPasswordReset = () => {
    //reset error message
    this.props.setUserSubmitError('');

    //validate password + handle errors
    const form = document.getElementsByClassName('profile__change-password-modal__form')[0];
    const currentPassword = form.elements.oldPassword.value;
    const newPassword = form.elements.newPassword.value;
    const newPasswordCheck = form.elements.newPasswordCheck.value;

    if (currentPassword !== this.props.user.password) { //this will need to be checked by hash later
      return this.props.setUserSubmitError('Incorrect password.');
    };

    if (newPassword.length < 6) return this.props.setUserSubmitError('Password must be at least 6 characters long.');
    if (newPassword !== newPasswordCheck) return this.props.setUserSubmitError('Passwords do not match.');

    const updatedUser = {
      ...this.props.user,
      password: newPassword,
    };

    this.updateUserInformation(updatedUser, 'Your password was successfully updated.');
  };

  requestEmailReset = () => {
    //reset error message
    this.props.setUserSubmitError('');

    //validate password + handle errors
    const form = document.getElementsByClassName('profile__change-email-modal__form')[0];
    const password = form.elements.password.value;
    const newEmail = form.elements.newEmail.value;
    const newEmailCheck = form.elements.newEmailCheck.value;

    if (password !== this.props.user.password) { //this will need to be checked by hash later
      return this.props.setUserSubmitError('Incorrect password.');
    };

    if (!validator.isEmail(newEmail)) return this.props.setUserSubmitError('Please enter a valid email address.');
    //this should send a verification email later - for password too

    if (newEmail !== newEmailCheck) return this.props.setUserSubmitError('Emails do not match.');

    const updatedUser = {
      ...this.props.user,
      email: newEmail,
    };

    this.updateUserInformation(updatedUser, 'Your email address was successfully updated.');
  };

  submitNewAgeRange = () => {
    const ageRange = document.getElementsByClassName('profile__change-ageRange-modal__form')[0].elements.ageRange.value;

    const updatedUser = {
      ...this.props.user,
      ageRange
    };

    this.updateUserInformation(updatedUser, 'Your age range was successfully updated. Happy Birthday!');
  };

  updateUserInformation(updatedUser, successMessage) {
    //update to db
    this.props.socket.emit('updateUser', updatedUser, (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUserSubmitSuccess(successMessage);
          //update redux state
          this.props.setUser(res);
          this.closeModal();
        });
      };
    });
  };

  deleteProfile = () => {
    console.log('delete profile');

    this.props.socket.emit('deleteUser', this.props.user._id, (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', null, () => {
          this.props.setUserSubmitSuccess('Your profile was succesfully deleted.');//never seen :/
          //update redux state
          this.props.setUser({});
          this.closeModal();

          window.location.pathname = '/';
        });
      }
    });
  };

  makeAgeRangeUserFriendly = () => {
    const ageRangeNumber = this.props.user.ageRange;

    switch(ageRangeNumber) {
      case '1': return 'under 18';
      case '2': return '18-30';
      case '3': return '30-45';
      case '4': return '45-60';
      case '5': return '60+';
      default: return 'no age selected.';
    };
  }

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
        stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };

  render () {
    return (
      <div className = "profile">

        <TitleBar
          showBackToIndex = {true}
          title = "Your Profile"
          titleClass = "profile__title"
          showLogout = {true}
        />

        <span>{this.props.submitSuccess}</span>

        <UserProfileForm
          user = {this.props.user}
          userFriendlyAgeRange = {this.makeAgeRangeUserFriendly()}
          setShowChangePasswordModal = {this.setShowChangePasswordModal}
          setShowChangeEmailModal = {this.setShowChangeEmailModal}
          setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
        />

        {/* Delete Button */}
        <div
          className = "profile__delete-button"
          onClick = {this.setShowVerifyDeleteModal}
        >
          Delete Profile
        </div>

        {this.state.showChangePasswordModal &&
        <Modal>
          <ChangePasswordModal
            requestPasswordReset = {this.requestPasswordReset}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {this.state.showChangeEmailModal &&
        <Modal>
          <ChangeEmailModal
            requestEmailReset = {this.requestEmailReset}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {this.state.showChangeAgeRangeModal &&
        <Modal>
          <ChangeAgeRangeModal
            submitNewAgeRange = {this.submitNewAgeRange}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {/* delete modal */}
        {this.state.showVerifyDeleteModal &&
          <Modal>
            <VerifyDeleteModal
              submitError = {this.props.submitError}
              deleteProfile = {this.deleteProfile}
              closeModal = {this.closeModal}
            />
          </Modal>
        }

        <Footer />

      </div>
    );
  };
};

const mapStateToProps = (reduxStore) => ({
  user: reduxStore.userReducer.user,
  submitError: reduxStore.userReducer.submitError,
  submitSuccess: reduxStore.userReducer.submitSuccess,
});

const mapDispatchToProps = {
  setUser,
  setUserSubmitError,
  setUserSubmitSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
