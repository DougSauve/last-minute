import React from 'react';

import { connect } from 'react-redux';
import { setUser } from '../../redux/user';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import UserProfileForm from './UserProfileForm';
import Modal from '../_common/modal/_Modal';
import VerifyDeleteModal from './VerifyDeleteModal';

// the profile page shows the user's profile info in a form, where most things can be updated.
// It shows flags when there are 3 or more, which can be accessed and disputed in a modal.
// It shows buttons to update and delete the profile.

class Profile extends React.Component {
  state = {
    showChangePasswordModal: false,
    showChangeEmailAddressModal: false,
    showChangeAgeRangeModal: false,
    showVerifyDeleteModal: false,
  };

  componentDidMount() {
    this.props.socket.emit('getCurrentUser', (user) => {
      if (user) this.props.setUser(user);
    });
  };

  setShowChangePasswordModal = () => {
    this.setState(() => ({ showChangePasswordModal: true }));
  };
  setShowChangeEmailAddressModal = () => {
    this.setState(() => ({ showChangeEmailAddressModal: true }));
  };
  setShowChangeAgeRangeModal = () => {
    this.setState(() => ({ showChangeAgeRange: true }));
  };
  setShowVerifyDeleteModal = () => {
    this.setState(() => ({ showVerifyDeleteModal: true }));
  };

  updateProfile = () => {
    console.log('update profile');
  };

  deleteProfile = () => {
    console.log('delete profile');
  };

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

        <UserProfileForm
          user = {this.props.user}
        />

        {/* Delete Button */}
        <div
          className = "profile__delete-button"
          onClick = {this.setShowVerifyDeleteModal}
        >
          Delete Profile
        </div>

        {/* delete modal */}
        {this.state.showVerifyDeleteModal &&
          <Modal>
            <VerifyDeleteModal
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
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
