import React from 'react';

const ChangeAgeRangeModal = (props) => (
  // props: {
    // submitNewAgeRange = {this.submitNewAgeRange}
    // closeModal = {this.closeModal}
    // submitError = {this.props.submitError}
  // }
  <div className = "profile__change-ageRange-modal">
    <form className = "profile__change-ageRange-modal__form">
      <span>Age Range:</span>
      <select
        className = "profile__change-ageRange"
        name = "ageRange"
      >
        <option value = "1">under 18</option>
        <option value = "2">18-30</option>
        <option value = "3">30-45</option>
        <option value = "4">45-60</option>
        <option value = "5">60+</option>
      </select>
      <br />
    </form>

    <span className = "form__error">{props.submitError}</span>

    <div className = "profile__change-AgeRange-modal__submit-button"
      onClick = {props.submitNewAgeRange}
    >
      Change
    </div>

    <div className = "profile__change-AgeRange-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>
  </div>
);

export default ChangeAgeRangeModal;
