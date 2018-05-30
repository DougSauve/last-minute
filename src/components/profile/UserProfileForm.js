import React from 'react';

const UserProfileForm = (props) => (
  // props: {
  //   user = {this.props.user}
    // setShowChangePasswordModal = {this.setShowChangePasswordModal}
    // setShowChangeEmailModal = {this.setShowChangeEmailModal}
    // setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
  // }
  <div className = "profile__info">

    <div className = "profile__info__name">
    <span>Name:</span>
    <span>{props.user.name}</span>
    </div>

    <div
      className = "profile__change-password-button"
      onClick = {props.setShowChangePasswordModal}
    >
      change password
    </div>

    {/* if email address is changed, verify it */}
    <div
      className = "profile__email-info"
    >
      <span>Email Address:</span>
      <span>{props.user.email}</span>
      <div
        className = "profile__change-email-button"
        onClick = {props.setShowChangeEmailModal}
      >
        change email address
      </div>
    </div>

    {/* age range can only be changed once every 5 years*/}
    <div
      className = "profile__change-ageRange"
    >
      <span>Age Range:</span>
      <span>{props.userFriendlyAgeRange}</span>
      <div
        className = "profile__change-age-range-button"
        onClick = {props.setShowChangeAgeRangeModal}
      >
        change age range
      </div>
    </div>

    <div className = "profile__info__name">
    <span>Gender:</span>
    <span>{props.user.gender}</span>
    </div>

  </div>
);

export { UserProfileForm as default };
