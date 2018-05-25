import React from 'react';

const Slide4 = (props) => (
  // props: {
  //   notes = {this.props.myEvent.notes}
  //
  //   submitEvent = {this.submitEvent}
  //   closeModal = {this.closeModal}
  // }

  <div className = "events__create-event-modal__slide4">

    <div className = "events__submit-error">
      {props.submitError}
    </div>

    <form className = "events__create-event-modal__slide4__form">

      <span className = "form-heading">
        Notes:
      </span>
      <br />

      <textarea
        type = "text"
        name = "notes"
        rows = "4"
        cols = "50"
        defaultValue = {(props.notes) && props.notes}
      />

    </form>

    <div
      className = "events__create-event-modal__continue-button"
      onClick = {props.submitSlide4}
    >
      Submit Event
    </div>

    <div
      className = "events__create-event-modal__cancel-warn-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { Slide4 as default };
