import React from 'react';

const ChangeAgeRangeModal = (props) => (
  // props: {
  // userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
  // submitNewAgeRange = {this.submitNewAgeRange}
  // closeModal = {this.closeModal}
  // submitError = {this.props.submitError}
  // }
  <div className = "modal-padding center">
    <div className = "header">
      <div className = "size2">
        Change your age range
      </div>
    </div>

    <div className = "note">Note: You can only change your age range once every five years.</div>

    <div className = "modal-item-container">
      <form className = "profile__change-ageRange-modal__form profile-spacing">

        <div className = "property">
          <div className = "key--no-length width15">Password:</div>
          <div className = "value">
            <input
              className = "input"
              type = "password"
              name = "password"
            />
          </div>
        </div>

        <div className = "property">
          <div className = "key--no-length width15">New Age Range:</div>
          <select
            className = "input short-value"
            name = "ageRange"
          >
            <option value = "1">under 18</option>
            <option value = "2">18-30</option>
            <option value = "3">30-45</option>
            <option value = "4">45-60</option>
            <option value = "5">60+</option>
          </select>
        </div>

      </form>
    </div>

    <span className = "error">{props.submitError}</span>

    <div className = "button-container">
      <div className = "button width15 background-green"
        onClick = {props.submitNewAgeRange}
      >
        Submit
      </div>

      <div className = "button width15 background-none"
        onClick = {props.closeModal}
      >
        Cancel
      </div>
    </div>

  </div>
);

export default ChangeAgeRangeModal;
