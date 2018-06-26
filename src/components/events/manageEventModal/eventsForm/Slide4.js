import React from 'react';

const Slide4 = (props) => (
  // props: {
  //   notes = {this.props.myEvent.notes}
  //
  //   submitEvent = {this.submitEvent}
  //   closeModal = {this.closeModal}
  // }

  <div className = "modal-padding center">

    <div className = "header-modal">
      <div className = "size2">
        Notes:
      </div>
    </div>

    <div className = "modal-item-container">

      <div className = "error">
        {props.submitError}
      </div>

      <form className = "events__slide4__form">

        <textarea
          className = "input"
          type = "text"
          name = "notes"
          rows = "4"
          cols = "50"
          defaultValue = {(props.notes) && props.notes}
        />

      </form>

      <div
        className = "button background-green width15"
        onClick = {props.submitSlide4}
      >
        Submit Event
      </div>

      <div
        className = "button background-none width15"
        onClick = {props.closeModal}
      >
        Cancel
      </div>

    </div>
  </div>
);

export { Slide4 as default };
