import React from 'react';

const LogInModal = (props) => (
  // props {
  //   logIn = {this.logIn}
  //   closeModal = {this.closeModal}/>
  // }
  <div className = "landing__log-in-modal">

    <div className = "landing__log-in-modal">
      Welcome to LastMinute! Log in here.
    </div>

    <div className = "landing__log-in-modal__submit-button"
      onClick = {props.logIn}
    >
      Log in
    </div>

    <div className = "landing__log-in-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { LogInModal as default };
