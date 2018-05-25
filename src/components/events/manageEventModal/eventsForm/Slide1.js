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
  <div className = "events__create-event-modal__slide1">
    <form className = "events__create-event-modal__slide1__form">
      <span>
        What do you want to do?
      </span>
      <br />

      <input
        type = "text"
        name = "title"
        defaultValue = {(props.title) && props.title}
      />
      <br />

      <span className = "events__form__error">{props.titleError}</span>
      <br />
      <br />

      How many people can join (besides you)?
      <br />

      <input
        type = "number"
        min = "1"
        name = "minimumPeople"
        defaultValue = {(props.minimumPeople) ? props.minimumPeople : 1}
      />
       -
      <input
        type = "number"
        min = "1"
        name = "maximumPeople"
        defaultValue = {(props.maximumPeople) ? props.maximumPeople : 3}
      />
      People
      <br />

      <span className = "events__form__error">{props.minimumPeopleError}</span>
      <span className = "events__form__error">{props.maximumPeopleError}</span>


    </form>

    <div
      className = "events__create-event-modal__continue-button"
      onClick = {props.submitSlide1}
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


export { Slide1 as default };
