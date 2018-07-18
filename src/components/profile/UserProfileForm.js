import React from 'react';
import './UserProfileForm.scss';

const UserProfileForm = (props) => (
  // props: {
  // user = {this.props.user}
  // userFriendlyAgeRange = {this.makeAgeRangeUserFriendly()}
  // setShowChangePasswordModal = {this.setShowChangePasswordModal}
  // setShowChangeEmailModal = {this.setShowChangeEmailModal}
  // setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
  // setShowVerifyDeleteModal = {this.setShowVerifyDeleteModal}
  // }
  <div className = "center rem-above">

    <div className = "list">

      <div className = {props.deviceType === 'mobile' ?
        "list-item-container event-spacing user-profile-form__mobile-layout" : "list-item-container profile-spacing"}>

        <div className = "property width100_percent">
          <div className = "key">Name:</div>
          <div className = "flex-fill-space space-after">{props.user.name}</div>

          {
            props.deviceType === 'desktop' &&
            <div className = "short-value">
              <div className = "link"
                onClick = {props.setShowChangePasswordModal}
              >
                Change password
              </div>
            </div>
          }

        </div>

        <div className = "property width100_percent">
          <div className = "key">Email Address:</div>
          <div className = "flex-fill-space space-after">{props.user.email}</div>

          {
            props.deviceType === 'desktop' &&
            <div className = "short-value">
              <div className = "link"
                onClick = {props.setShowChangeEmailModal}
              >
                Change email address
              </div>
            </div>
          }

        </div>

        <div className = "property width100_percent">
          <div className = "key">Age Range:</div>
          <div className = "flex-fill-space">{props.userFriendlyAgeRange}</div>
          {
            props.deviceType === 'desktop' &&
            <div className = "short-value">
              <div className = "link"
                onClick = {props.setShowChangeAgeRangeModal}
              >
                Change age range
              </div>
            </div>
          }

        </div>

        <div className = "property width100_percent">
          <div className = "key">Gender:</div>
          <div className = "flex-fill-space">{props.user.gender}</div>
          {
            props.deviceType === 'desktop' &&
            <div className = "short-value">
              {/* Delete Button */}
              <div
                className = "link--red"
                onClick = {props.setShowVerifyDeleteModal}
              >
                Delete Profile
              </div>
            </div>
          }

        </div>

        {/* links for mobile */}
        {
          props.deviceType === 'mobile' &&
          <div className = "property--user-profile-form--mobile">

            <div className = "button background-blue width15"
              onClick = {props.setShowChangePasswordModal}
            >
              Change password
            </div>

            <div className = "button background-blue width15"
              onClick = {props.setShowChangeEmailModal}
            >
              Change email address
            </div>

            <div className = "button background-blue width15"
              onClick = {props.setShowChangeAgeRangeModal}
            >
              Change age range
            </div>

            <div
              className = "button background-red width15"
              onClick = {props.setShowVerifyDeleteModal}
            >
              Delete Profile
            </div>

          </div>
        }

      </div>
    </div>
  </div>
);

export { UserProfileForm as default };
