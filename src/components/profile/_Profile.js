import React from 'react';
import './_Profile.scss';

import validator from 'validator';

import { connect } from 'react-redux';
import { setUser, setUserSubmitError, setUserSubmitSuccess } from '../../redux/user';
import { setMyEvent } from '../../redux/myEvent';
import { setEvents } from '../../redux/events';
import { setMapError, clearErrors } from '../../redux/landingFormErrors';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../redux/currentLocation';

import { loadState } from '../_common/loadState';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import UserProfileForm from './UserProfileForm';
import EditHomeLocation from '../_common/EditHomeLocation';
import Modal from '../_common/modal/_Modal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeEmailModal from './ChangeEmailModal';
import ChangeAgeRangeModal from './ChangeAgeRangeModal';

import VerifyDeleteModal from './VerifyDeleteModal';
import SetPositionOnMapModal from '../_common/maps/SetPositionOnMapModal';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';
import makeAgeRangeUserFriendly from '../../../utils/makeAgeRangeUserFriendly';

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
    showAddHomeLocationModal: false,
    stateLoaded: false,
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(async () => {
      await this.setState(() => ({ stateLoaded: true }));
    });
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['escape', this.closeModal]);
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

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
      if (item !== 'stateLoaded') stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };

  setShowAddHomeLocationModal = (value) => {
    this.setState(() => ({ showAddHomeLocationModal: value }))
  };

  addHomeLocation = (place, location, address) => {
    this.props.socket.emit('addHomeLocationToUser', { user: this.props.user, homeLocation: {name: place, location, address} }, (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
          this.props.setUserSubmitSuccess(`${place} was added.`);
          this.closeModal();
        });
      };
    });
  };

  deleteHomeLocation = (homeLocation) => {
    console.log('delete', homeLocation);
    this.props.socket.emit('deleteHomeLocationFromUser', { user: this.props.user, _id: homeLocation._id }, (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
          this.props.setUserSubmitSuccess(`${homeLocation.name} was removed.`);
        });
      };
    });
  };

  switchHomeLocation = (homeLocation) => {
    this.props.socket.emit('setCurrentHomeLocation', {user: this.props.user, homeLocation }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
        });
      };
    });
  };

  render () {
    return (
      <div className = "profile">

        <TitleBar
          links = {['index']}
          showLogout = {true}
        />

        <div className = "success">{this.props.submitSuccess}</div>

        <div className = "header">
          <div className = "size3">
            Your Profile
          </div>
        </div>

        {(this.state.stateLoaded) &&
          <EditHomeLocation
            currentHomeLocation = {this.props.user.currentHomeLocation}
            homeLocations = {this.props.user.homeLocations}
            setShowAddHomeLocationModal = {this.setShowAddHomeLocationModal}
            deleteHomeLocation = {this.deleteHomeLocation}
            switchHomeLocation = {this.switchHomeLocation}
            complete = {true}

            showAddHomeLocationModal = {this.state.showAddHomeLocationModal}
          />
        }

        <UserProfileForm
          user = {this.props.user}
          userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
          setShowChangePasswordModal = {this.setShowChangePasswordModal}
          setShowChangeEmailModal = {this.setShowChangeEmailModal}
          setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
          setShowVerifyDeleteModal = {this.setShowVerifyDeleteModal}
        />

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
            userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
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

        {/* add homeLocation modal */}
        {this.state.showAddHomeLocationModal &&
          <SetPositionOnMapModal
            submit = {this.addHomeLocation}
            cancel = {this.closeModal}
            lat = {this.props.lat}
            lng = {this.props.lng}
            address = {this.props.address}
            setCurrentPlace = {this.props.setCurrentPlace}
            setCurrentAddress = {this.props.setCurrentAddress}
            mapNote = {'Choose a new home location on the map or enter an address instead. Your location is only used to calculate distance from events. The more specific, the more accurate distances will be, but an approximate location is fine.'}
            place = {this.props.place}
            mapError = {this.props.mapError}
          />
        }

        <Footer />

      </div>
    );
  };
};

const mapStateToProps = (reduxStore) => ({
  socket: reduxStore.socketReducer.socket,

  user: reduxStore.userReducer.user,
  submitError: reduxStore.userReducer.submitError,
  submitSuccess: reduxStore.userReducer.submitSuccess,

  place: reduxStore.currentLocationReducer.place,
  lat: reduxStore.currentLocationReducer.lat,
  lng: reduxStore.currentLocationReducer.lng,
  address: reduxStore.currentLocationReducer.address,

  mapError: reduxStore.landingFormErrorsReducer.mapError,
});

const mapDispatchToProps = {
  setUser,
  setEvents,
  setMyEvent,
  setUserSubmitError,
  setUserSubmitSuccess,

  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,

  setMapError,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
