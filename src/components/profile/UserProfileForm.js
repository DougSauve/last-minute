import React from 'react';

const UserProfileForm = (props) => (
  // props: {
  // user = {this.props.user}
  // userFriendlyAgeRange = {this.makeAgeRangeUserFriendly()}
  // setShowChangePasswordModal = {this.setShowChangePasswordModal}
  // setShowChangeEmailModal = {this.setShowChangeEmailModal}
  // setShowChangeAgeRangeModal = {this.setShowChangeAgeRangeModal}
  // setShowVerifyDeleteModal = {this.setShowVerifyDeleteModal}
  // }
  <div className = "center drop-2-rem">

    <div className = "list">

      <div className = "list-item-container profile-spacing">

        <div className = "property">
          <div className = "key">Name:</div>
          <div className = "short-value">{props.user.name}</div>
          <div className = "short-value">
            <div className = "link"
              onClick = {props.setShowChangePasswordModal}
            >
              Change password
            </div>
          </div>
        </div>

        <div className = "property">
          <div className = "key">Email Address:</div>
          <div className = "short-value">{props.user.email}</div>
          <div className = "short-value">
            <div className = "link"
              onClick = {props.setShowChangeEmailModal}
            >
              Change email address
            </div>
          </div>
        </div>

        <div className = "property">
          <div className = "key">Age Range:</div>
          <div className = "short-value">{props.userFriendlyAgeRange}</div>
          <div className = "short-value">
            <div className = "link"
              onClick = {props.setShowChangeAgeRangeModal}
            >
              Change age range
            </div>
          </div>
        </div>

        <div className = "property">
          <div className = "key">Gender:</div>
          <div className = "short-value">{props.user.gender}</div>
          <div className = "short-value">
            {/* Delete Button */}
            <div
              className = "link--red"
              onClick = {props.setShowVerifyDeleteModal}
            >
              Delete Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { UserProfileForm as default };
