import React from 'react';

const UserProfileForm = (props) => (
  // props: {
  //   user = {this.props.user}
  // }
  <div className = "profile__info">

    <div className = "profile__info__name">
    <span>Name:</span>
    <span>{props.user.name}</span>
    </div>

    <div
      className = "profile__change-password-button"
      onClick = {() => {alert('sending change password email')}}
    >
      change password
    </div>

    {/* if email address is changed, verify it */}
    <div
      className = "profile__email-info"
    >
      <span>Email Address:</span>
      <span>{props.user.email}</span>
      <span
        className = "profile__change-email-adress-button"
        onClick = {() => {alert('sending change password email')}}
      >
        change email address
      </span>
    </div>

    {/* age range can only be changed once every 5 years*/}
    <div
      className = "profile__email-ageRange"
    >
      <span>Age Range:</span>
      <span>{props.user.ageRange}</span>
      <span
        className = "profile__change-age-range-button"
        onClick = {() => {alert('sending change password email')}}
      >
        change age range
      </span>
    </div>

    <div className = "profile__info__name">
    <span>Gender:</span>
    <span>{props.user.gender}</span>
    </div>

  </div>
);

export { UserProfileForm as default };
