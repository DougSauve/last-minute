import React from 'react';

import {handleKeyboardEvents} from '../../../../../utils/handleKeyboardEvents';

class Slide2 extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.currentSlide === "2") {
          handleKeyboardEvents(['enter', this.props.submitSlide2], ['escape', this.props.closeModal], e);
      };
    };
  };

  componentWillUnmount() {
    document.onkeydown = () => {};
  };

  render() {
    return (
      // props: {
      //   expiresAtHour = {this.props.expiresAtHour}
      //   expiresAtMinute = {this.props.expiresAtMinute}
      //   expiresAtAM = {this.props.expiresAtAM}
      //   expiresAtError = {this.props.expiresAtError}
      //
      //   goToSlide = {this.goToSlide}
      //   closeModal = {this.closeModal}
      // }

      <div className = "modal-padding center">

        <div className = "header-modal">
          <div className = "size2">
            When?
          </div>
        </div>

        <div className = "modal-item-container">
          <form className = "events__slide2__form">
            <div className = "property center">

              <select
                className = "input width3"
                name = "expiresAtHour"
              >
                <option value = {this.props.expiresAtHour ? this.props.expiresAtHour : ""}>
                  {this.props.expiresAtHour && this.props.expiresAtHour}
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
              <select
                className = "input width3"
                name = "expiresAtMinute">
                <option value = {this.props.expiresAtMinute ? this.props.expiresAtMinute : ""}>
                  {this.props.expiresAtMinute && this.props.expiresAtMinute}
                </option>
                <option value = "00">00</option>
                <option value = "15">15</option>
                <option value = "30">30</option>
                <option value = "45">45</option>
              </select>

              <select
                className = "input width3"
                name = "expiresAtAM">
                <option value = {this.props.expiresAtAM ? this.props.expiresAtAM : ""}>
                  {this.props.expiresAtAM && this.props.expiresAtAM}
                </option>
                <option value = "AM">AM</option>
                <option value = "PM">PM</option>
              </select>

              <span className = "error">{this.props.titleError}</span>
            </div>

          </form>

          <div
            className = "button background-green width15"
            onClick = {this.props.submitSlide2}
          >
            Continue
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

export { Slide2 as default };
