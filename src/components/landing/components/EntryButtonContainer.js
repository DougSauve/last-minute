import React from 'react';

// Container for entry buttons
const EntryButtonContainer = () => (
  <div className = "landing__entry-button-container">

    {/* Create Button */}
    <div
      className = "landing__sign-up-button"
      onClick = {() => {alert('sign up')}}
    >
      Sign up
    </div>

    {/* Update Button */}
    <div
      className = "landing__log-in-button"
      onClick = {() => {alert('log in')}}
    >
      Log in
    </div>

  </div>
);

export { EntryButtonContainer as default };
