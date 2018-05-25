import React from 'react';

import { connect } from 'react-redux';


import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import UserProfileForm from './UserProfileForm';
import ModifyProfileButtonContainer from './ModifyProfileButtonContainer';
import Modal from '../_common/modal/_Modal';
import VerifyDeleteModal from './VerifyDeleteModal';

// the profile page shows the user's profile info in a form, where most things can be updated.
// It shows flags when there are 3 or more, which can be accessed and disputed in a modal.
// It shows buttons to update and delete the profile.

class Profile extends React.Component {
  state = {
    showVerifyDeleteModal: false,
  };

  getProfileFromForm = () => {
    const form = document.getElementsByClassName('profile__form')[0];

    return {
      email: form.elements.email.value.trim(),
      password: form.elements.password.value,
      ageRange: form.elements.ageRange.value,
      gender: form.elements.gender.value,
    };
  }

  updateProfile = () => {
    const profile = this.getProfileFromForm();

    console.log(profile);
  }

  setShowVerifyDeleteModal = () => {
    this.setState(() => ({ showVerifyDeleteModal: true }));
  }

  deleteProfile = () => {

    console.log('delete');
  }

  closeModal = () => {
    this.setState(() => ({ showVerifyDeleteModal: false }));
  }

  render () {
    return (
      <div className = "profile">

        <TitleBar
          showBackToIndex = {true}
          title = "Your Profile"
          titleClass = "profile__title"
          showLogout = {true}
        />

        <UserProfileForm />

        <ModifyProfileButtonContainer
          updateProfile = {this.updateProfile}
          setShowVerifyDeleteModal = {this.setShowVerifyDeleteModal}
        />

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

});
export default connect(mapStateToProps)(Profile);
