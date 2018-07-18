import React from 'react';

import {handleKeyboardEvents} from '../../../../../utils/handleKeyboardEvents';

class Slide4 extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.currentSlide === "4") {
          handleKeyboardEvents(['enter', this.props.submitSlide4], ['escape', this.props.closeModal], e);
      };
    };
  };

  componentWillUnmount() {
    document.onkeydown = () => {};
  };

  render() {
    return (
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
            {this.props.submitError}
          </div>

          <form className = "events__slide4__form center">

            <textarea
              className = "input"
              type = "text"
              name = "notes"
              rows = "4"
              defaultValue = {(this.props.notes) && this.props.notes}
              autoFocus
            />

          </form>

          <div
            className = "button background-green width15"
            onClick = {this.props.submitSlide4}
          >
            Submit Event
          </div>

          <div
            className = "button background-none width15"
            onClick = {this.props.closeModal}
          >
            Cancel
          </div>

        </div>
      </div>
    );
  };
};

export { Slide4 as default };
