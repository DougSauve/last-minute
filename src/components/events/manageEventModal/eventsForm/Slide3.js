import React from 'react';

import MeetingPlace from './meetingPlace/_MeetingPlace';

const Slide3 = (props) => (
  // props: {
  // place = {this.props.myEvent.place}
  // placeError = {this.props.placeError}
  //
  // setLocationAndAddress = {this.setLocationAndAddress}
  // submitSlide3 = {this.submitSlide3}
  // closeModal = {this.closeModal}
  // }

  <div className = "events__create-event-modal__slide3">
    <span className = "form-heading">
      Choose a meeting place
    </span>
    <br />

    <MeetingPlace
      submitSlide3 = {props.submitSlide3}
     />

    <form className = "events__create-event-modal__slide3__form">

      <span
        className = "form-heading"
      >
        Name of meeting place:
      </span>
      <br />

      <span className = "events__form__error">{props.placeError}</span>

      <span className = "form-secondary-text">
        For safety, please choose a public place close to your event, and go to your event's location from there.
      </span>
      <br />

      <input
        type = "text"
        name = "place"
        defaultValue = {(props.place) && props.place}
      />
      <br />

      {/* <span className = "events__form__error">{props.placeError}</span> */}
      <br />

    </form>

    <div
      className = "events__create-event-modal__cancel-warn-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { Slide3 as default };
