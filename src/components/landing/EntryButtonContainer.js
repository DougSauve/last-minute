import React from 'react';

// Container for entry buttons
const EntryButtonContainer = (props) => (
  // props: {
  //   setShowSignUpModal = {this.setShowSignUpModal}
  //   setShowLogInModal = {this.setShowLogInModal}
  // };
  <div className = "landing__entry-button-container">

    {/* Sign up Button */}
    <div
      className = "landing__sign-up-button"
      onClick = {props.setShowSignUpModal}
    >
      Sign up
    </div>

    {/* Log in Button */}
    <div
      className = "landing__log-in-button"
      onClick = {props.setShowLogInModal}
    >
      Log in
    </div>

  </div>
);

export { EntryButtonContainer as default };
