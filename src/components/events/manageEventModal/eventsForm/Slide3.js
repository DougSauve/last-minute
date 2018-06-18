import React from 'react';

import MeetingPlace from './meetingPlace/_MeetingPlace';

const Slide3 = (props) => (
  // props: {
  // place = {this.props.myEvent.place}
  // placeError = {this.props.placeError}
  //
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

    <div
      className = "events__create-event-modal__cancel-warn-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { Slide3 as default };
