import React from 'react';

import {handleKeyboardEvents} from '../../../../../utils/handleKeyboardEvents';

class Slide1 extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.currentSlide === "1") {
          handleKeyboardEvents(['enter', this.props.submitSlide1], ['escape', this.props.closeModal], e);
      };
    };
  };

  componentWillUnmount() {
    document.onkeydown = () => {};
  };

  render() {
    return (
      // props: {
      //   title = {this.props.myEvent.title}
      //   titleError = {this.props.titleError}
      //
      //   minimumPeople = {this.props.myEvent.minimumPeople}
      //   minimumPeopleError = {this.props.minimumPeopleError}
      //
      //   maximumPeople = {this.props.myEvent.maximumPeople}
      //   maximumPeopleError = {this.props.maximumPeopleError}
      //
      //   goToSlide = {this.goToSlide}
      //   closeModal = {this.closeModal}
      // }
      <div className = "modal-padding center">

        <div className = "header-modal">
          <div className = "size2">
            What's happening?
          </div>
        </div>

        <div className = "modal-item-container">
          <form className = "events__slide1__form">
            <div className = "property">
              <div className = "key--no-width width15">
                What do you want to do?
              </div>
              <div className = "width15">
                <input
                  className = "input width15"
                  type = "text"
                  name = "title"
                  defaultValue = {(this.props.title) && this.props.title}
                  autoFocus
                />
                <span className = "error">{this.props.titleError}</span>
              </div>
            </div>

            <div className = "property">
              <div className = "key--no-width width15">
                How many people can join (including you)?
              </div>
              <div className = "width15 row center-vertically">
                <input
                  className = "input width2 flex-fill-space"
                  type = "number"
                  name = "minimumPeople"
                  defaultValue = {(this.props.minimumPeople) ? this.props.minimumPeople : 2}
                />
                 -
                <input
                  className = "input width2 flex-fill-space"
                  type = "number"
                  name = "maximumPeople"
                  defaultValue = {(this.props.maximumPeople) ? this.props.maximumPeople : 4}
                />
                 People
                <span className = "error">{this.props.minimumPeopleError}</span>
                <span className = "error">{this.props.maximumPeopleError}</span>
              </div>
            </div>

          </form>

          {/* <div className = "button-container"> */}
            <div
              className = "button background-green width15"
              onClick = {this.props.submitSlide1}
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

export { Slide1 as default };
