import React from 'react';

// Container for profile modification buttons
const ModifyProfileButtonContainer = (props) => (
  // props: {
  //   updateProfile: (),
  //   deleteProfile: ();
  // }

  <div className = "profile__modify-profile-button-container">

    {/* Update Button */}
    <div
      className = "profile__update-button"
      onClick = {props.updateProfile}
    >
      Update Profile
    </div>

    {/* Delete Button */}
    <div
      className = "profile__delete-button"
      onClick = {props.setShowVerifyDeleteModal}
    >
      Delete Profile
    </div>

  </div>
);

export { ModifyProfileButtonContainer as default };
