import React from 'react';
import moment from 'moment';

import './_Profile.scss';

import validator from 'validator';

import { connect } from 'react-redux';
import {
  setUser,
  setUserSubmitError,
  setUserSubmitSuccess,
  setDeleteProfileError,
  clearDeleteProfileError,
} from '../../redux/user';
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
import getDeviceType from '../../../utils/getDeviceType';

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
    deviceType: getDeviceType(),
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(async () => {
      await this.setState(() => ({ stateLoaded: true }));
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

    this.props.socket.emit('validateUser', {email: this.props.user.email, password: currentPassword }, (err, res) => {
      if ((res) && JSON.stringify(res._id) === JSON.stringify(this.props.user._id)) {
        if (newPassword.length < 6) return this.props.setUserSubmitError('Password must be at least 6 characters long.');
        if (newPassword !== newPasswordCheck) return this.props.setUserSubmitError('Passwords do not match.');

        this.props.socket.emit('updatePassword', {user: this.props.user, password: newPassword}, (err, res) => {
          if (err) {
          this.props.setUserSubmitError(err);
          } else {
            this.props.socket.emit('setCurrentUser', res, () => {
              this.props.setUserSubmitSuccess('Your password has been updated.');
              //update redux state
              this.props.setUser(res);
              this.closeModal();
            });
          };
        });
      } else {
        this.props.setUserSubmitError(err);
      };
    });

  };
  requestEmailReset = () => {
    //reset error message
    this.props.setUserSubmitError('');

    //validate password + handle errors
    const form = document.getElementsByClassName('profile__change-email-modal__form')[0];
    const password = form.elements.password.value;
    const newEmail = form.elements.newEmail.value;
    const newEmailCheck = form.elements.newEmailCheck.value;

    this.props.socket.emit('validateUser', {email: this.props.user.email, password }, (err, res) => {
      if ((res) && JSON.stringify(res._id) === JSON.stringify(this.props.user._id)) {
        if (!validator.isEmail(newEmail)) return this.props.setUserSubmitError('Please enter a valid email address.');
        //this should send a verification email later - for password too

        if (newEmail !== newEmailCheck) return this.props.setUserSubmitError('Emails do not match.');

        const updatedUser = {
          ...this.props.user,
          email: newEmail,
        };

        this.updateUserInformation(updatedUser, 'Your email address was successfully updated.');
      } else {
        this.props.setUserSubmitError(err);
      };
    });
  };
  submitNewAgeRange = () => {
    //reset error message
    this.props.setUserSubmitError('');

    const form = document.getElementsByClassName('profile__change-ageRange-modal__form')[0];
    const password = form.elements.password.value;
    const ageRange = form.elements.ageRange.value;

    this.props.socket.emit('validateUser', {email: this.props.user.email, password }, (err, res) => {
      if ((res) && JSON.stringify(res._id) === JSON.stringify(this.props.user._id)) {
        //check if ageRangeCanChangeAt has happened yet
        if (new moment().isAfter(moment(this.props.user.ageRangeCanChangeAt))) {

          const newChangeDate = new moment().add(5, "year").hour(0).minute(0).second(0).format();

          const updatedUser = {
            ...this.props.user,
            ageRange,
            ageRangeCanChangeAt: newChangeDate,
          };

          this.updateUserInformation(updatedUser, 'Your age range was successfully updated. You will not be able to update your age range again until ' + moment(newChangeDate).format("MMMM Do, YYYY") + '. Happy Birthday!');
        } else {
          this.props.setUserSubmitError(`Sorry, your age range cannot be changed until ${moment(this.props.user.ageRangeCanChangeAt).format("MMMM Do, YYYY")}.`);
        };
      } else {
        this.props.setUserSubmitError(err);
      };
    });
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
    //verify that they have no hosted events
    if(this.props.user.hostedEvents[0]) {
      this.props.setDeleteProfileError(`You are hosting an event called ${this.props.user.hostedEvents[0].title}. You will need to remove it before you can delete your profile.` );
    } else {
      //delete
      this.props.socket.emit('deleteUser', this.props.user._id, (err, res) => {
        if (err) {
          this.props.setUserSubmitError(err);
        } else {
          this.props.socket.emit('setCurrentUser', null, () => {
            this.props.setUserSubmitSuccess('Your profile was succesfully deleted.');//never seen :/

            //reset session state
            this.props.socket.emit('setMyEvent', null);
            this.props.socket.emit('setCurrentUser', null, () => {
              window.location.pathname = '/';
            });
          });
        }
      });
    };
  };

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
      if (item !== 'stateLoaded' && item !== 'deviceType') stateToChange[item] = false;
    };

    this.props.setUserSubmitSuccess(this.props.submitSuccess);

    this.setState(() => ({ ...stateToChange }));
  };

  setShowAddHomeLocationModal = (value) => {
    this.setState(() => ({ showAddHomeLocationModal: value }))
  };
  addHomeLocation = (place, location, address) => {

    place = place.trim();

    //form validation
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

    //if no errors, add the location
    if (!errorsPresent) {
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
  };
  deleteHomeLocation = (homeLocation) => {
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
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
        });
      };
    });
  };

  render () {
    return (
      <div className = "profile center">

        <TitleBar
          links = {['index']}
          showLogout = {true}
          deviceType = {this.state.deviceType}
        />

        <div className = "success profile__success-message">{this.props.submitSuccess}</div>

        <div className = {this.state.deviceType === 'mobile' ? "header--fixed profile-header-pl" : "header profile-header-d"}>
          <div className = "size3">
            Your Profile
          </div>
        </div>

        {(this.state.stateLoaded) &&
          <div className = "options--profile">
            <EditHomeLocation
              currentHomeLocation = {this.props.user.currentHomeLocation}
              homeLocations = {this.props.user.homeLocations}
              setShowAddHomeLocationModal = {this.setShowAddHomeLocationModal}
              deleteHomeLocation = {this.deleteHomeLocation}
              switchHomeLocation = {this.switchHomeLocation}
              complete = {true}

              showAddHomeLocationModal = {this.state.showAddHomeLocationModal}
              deviceType = {this.state.deviceType}
            />
          </div>
        }

        <UserProfileForm
          user = {this.props.user}
          userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
          setShowChangePasswordModal = {this.setShowChangePasswordModal}
          setShowChangeEmailModal = {this.setShowChangeEmailModal}
          setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
          setShowVerifyDeleteModal = {this.setShowVerifyDeleteModal}
          deviceType = {this.state.deviceType}
        />

        {this.state.showChangePasswordModal &&
        <Modal
          close = {this.closeModal}
          deviceType = {this.state.deviceType}
          keepSize = {true}
          classNames = "scrollable"
        >
          <ChangePasswordModal
            showChangePasswordModal = {this.state.showChangePasswordModal}
            requestPasswordReset = {this.requestPasswordReset}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {this.state.showChangeEmailModal &&
        <Modal
          close = {this.closeModal}
          deviceType = {this.state.deviceType}
          keepSize = {true}
          classNames = "scrollable"
        >
          <ChangeEmailModal
            showChangeEmailModal = {this.state.showChangeEmailModal}
            requestEmailReset = {this.requestEmailReset}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {this.state.showChangeAgeRangeModal &&
        <Modal
          close = {this.closeModal}
          deviceType = {this.state.deviceType}
          keepSize = {true}
          classNames = "scrollable"
        >
          <ChangeAgeRangeModal
            showChangeAgeRangeModal = {this.state.showChangeAgeRangeModal}
            userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
            submitNewAgeRange = {this.submitNewAgeRange}
            closeModal = {this.closeModal}
            submitError = {this.props.submitError}
          />
        </Modal>
        }

        {/* delete modal */}
        {this.state.showVerifyDeleteModal &&
          <Modal
            close = {this.closeModal}
            deviceType = {this.state.deviceType}
            keepSize = {true}
            classNames = "scrollable"
          >
            <VerifyDeleteModal
              showVerifyDeleteModal = {this.state.showVerifyDeleteModal}
              submitError = {this.props.submitError}
              deleteProfile = {this.deleteProfile}
              closeModal = {this.closeModal}

              deleteProfileError = {this.props.deleteProfileError}
              clearDeleteProfileError = {this.props.clearDeleteProfileError}
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
            homeLocation = {this.props.user.currentHomeLocation}
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
  deleteProfileError: reduxStore.userReducer.deleteProfileError,

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
  setDeleteProfileError,
  clearDeleteProfileError,

  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,

  setMapError,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
