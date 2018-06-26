import React from 'react';

const Slide1 = (props) => (
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
          <div className = "value--no-width">
            <input
              className = "input width15"
              type = "text"
              name = "title"
              defaultValue = {(props.title) && props.title}
            />
            <span className = "error">{props.titleError}</span>
          </div>
        </div>

        <div className = "property">
          <div className = "key--no-width width15">
            How many people can join (besides you)?
          </div>
          <div className = "value--no-width">
            <input
              className = "input width2"
              type = "number"
              name = "minimumPeople"
              defaultValue = {(props.minimumPeople) ? props.minimumPeople : 1}
            />
             -
            <input
              className = "input width2"
              type = "number"
              name = "maximumPeople"
              defaultValue = {(props.maximumPeople) ? props.maximumPeople : 3}
            />
             People
            <span className = "error">{props.minimumPeopleError}</span>
            <span className = "error">{props.maximumPeopleError}</span>
          </div>
        </div>

      </form>

      {/* <div className = "button-container"> */}
        <div
          className = "button background-green width15"
          onClick = {props.submitSlide1}
        >
          Continue
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


export { Slide1 as default };
