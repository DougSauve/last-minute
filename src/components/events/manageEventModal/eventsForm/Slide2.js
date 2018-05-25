import React from 'react';

const Slide2 = (props) => (
  // props: {
  //   expiresAtHour = {this.props.expiresAtHour}
  //   expiresAtMinute = {this.props.expiresAtMinute}
  //   expiresAtAM = {this.props.expiresAtAM}
  //   expiresAtError = {this.props.expiresAtError}
  //
  //   goToSlide = {this.goToSlide}
  //   closeModal = {this.closeModal}
  // }

  <div className = "events__create-event-modal__slide2">
    <form className = "events__create-event-modal__slide2__form">

      <span className = "form-heading">
        What time?
      </span>
      <br />

      <select name = "expiresAtHour">
        <option value = {props.expiresAtHour ? props.expiresAtHour : ""}>
          {props.expiresAtHour && props.expiresAtHour}
        </option>
        <option value = "1">1</option>
        <option value = "2">2</option>
        <option value = "3">3</option>
        <option value = "4">4</option>
        <option value = "5">5</option>
        <option value = "6">6</option>
        <option value = "7">7</option>
        <option value = "8">8</option>
        <option value = "9">9</option>
        <option value = "10">10</option>
        <option value = "11">11</option>
        <option value = "12">12</option>
      </select>
      :
      <select name = "expiresAtMinute">
        <option value = {props.expiresAtMinute ? props.expiresAtMinute : ""}>
          {props.expiresAtMinute && props.expiresAtMinute}
        </option>
        <option value = "00">00</option>
        <option value = "15">15</option>
        <option value = "30">30</option>
        <option value = "45">45</option>
      </select>

      <select name = "expiresAtAM">
        <option value = {props.expiresAtAM ? props.expiresAtAM : ""}>
          {props.expiresAtAM && props.expiresAtAM}
        </option>
        <option value = "AM">AM</option>
        <option value = "PM">PM</option>
      </select>
      <br />

      <span className = "events__form__error">{props.expiresAtError}</span>

    </form>

    <div
      className = "events__create-event-modal__continue-button"
      onClick = {props.submitSlide2}
    >
      Continue
    </div>

    <div
      className = "events__create-event-modal__cancel-warn-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { Slide2 as default };
