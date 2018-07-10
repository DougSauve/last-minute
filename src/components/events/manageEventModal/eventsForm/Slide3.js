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

  <div className = "modal-padding center">

    <div className = "header-modal">
      <div className = "size2">
        Where?
      </div>
    </div>

    <br />

    <MeetingPlace
      submitSlide3 = {props.submitSlide3}
      closeModal = {props.closeModal}
      currentSlide = {props.currentSlide}
     />
  </div>
);

export { Slide3 as default };
