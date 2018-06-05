import React from 'react';
import moment from 'moment';

import './_EventsForm.scss';

import { connect } from 'react-redux';
import { setMode, setSubmitError, setSubmitSuccess } from '../../../../redux/events';
import { setCurrentSlide } from '../../../../redux/eventsForm';
import {
  setExpiresAtError,
  setTitleError,
  setPlaceError,
  setMinimumPeopleError,
  setMaximumPeopleError,
  clearErrors,
} from '../../../../redux/eventsFormErrors';
import { setMyEvent } from '../../../../redux/myEvent';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

class EventsForm extends React.Component {
  // props: {
  //   handleSendEvent_to_db = {this.handleSendEvent_to_db}
  // }

  state = {
    eventUnderConstruction: {}
  }

  addEventProperties (formClassName) {

    if (arguments.length < 2) return;

    const form = document.getElementsByClassName(formClassName)[0];

    //put args into an array - const formInputFields
    const formInputFields = [];

    for (let a = 1; a < arguments.length; a++) {
      formInputFields[a - 1] = arguments[a];
    };

    const eventUnderConstruction = this.state.eventUnderConstruction;

    //forEach the array
    formInputFields.forEach((field) => {
      eventUnderConstruction[field] = form.elements[field].value;
    });

    //set the object in state
    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        ...eventUnderConstruction
      }
     }));
  }

  submitSlide1 = () => {
    //check if there are any errors
    if (this.setSlide1Errors()) return; //not catching anything, or at least not tripping

    //if no errors
    this.addEventProperties(
      "events__create-event-modal__slide1__form",
      "title",
      "minimumPeople",
      "maximumPeople"
    );

    this.props.setCurrentSlide("2");
  };

  setSlide1Errors = () => {
    this.props.clearErrors();

    const form = document.getElementsByClassName("events__create-event-modal__slide1__form")[0];
    const title = form.elements.title.value;
    const minimumPeople = form.elements.minimumPeople.value;
    const maximumPeople = form.elements.maximumPeople.value;

    let errorsPresent = false;

    if (!title || title.length < 1 || parseInt(title) === parseInt(title)) {
      errorsPresent = true;
      this.props.setTitleError('Please enter a name for your event.');
    };

    if (parseInt(minimumPeople) < 1) {
      errorsPresent = true;
      this.props.setMinimumPeopleError('Please enter a minimum number of people.');
    }

    if (parseInt(maximumPeople) < parseInt(minimumPeople)) {
      errorsPresent = true;
      this.props.setMaximumPeopleError('The maximum number of people can\'t be less than the minimum!');
    };

    return errorsPresent;
  };

  submitSlide2 = () => {
    //check if there are any errors
    if (this.setSlide2Errors()) return; //not catching anything, or at least not tripping

    //if no errors
    this.addEventProperties(
      "events__create-event-modal__slide2__form",
      "expiresAtHour",
      "expiresAtMinute",
      "expiresAtAM",
    );

    //assemble ExpiresAt and put it into the state object as well
    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        expiresAt: this.assembleExpiresAt(),
      }
     }));

    this.props.setCurrentSlide("3");
  };

  setSlide2Errors = () => {
    this.props.clearErrors();

    const form = document.getElementsByClassName("events__create-event-modal__slide2__form")[0];
    const expiresAtHour = form.elements.expiresAtHour.value;
    const expiresAtMinute = form.elements.expiresAtMinute.value;
    const expiresAtAM = form.elements.expiresAtAM.value;

    let errorsPresent = false;

    if (!expiresAtHour || !expiresAtMinute || !expiresAtAM) {
      errorsPresent = true;
      this.props.setExpiresAtError('Please choose a time for your event.');
    };

    return errorsPresent;
  };

  assembleExpiresAt = () => {

    let hour = this.state.eventUnderConstruction.expiresAtHour;
    const minute = this.state.eventUnderConstruction.expiresAtMinute;
    const am = this.state.eventUnderConstruction.expiresAtAM;

    if (am === "PM") {
      hour = (parseInt(hour) + 12).toString();
    } else {
      hour = "0".concat(hour);
    }

    let expiresAt = moment().hour(hour).minute(minute).second(0).format();
    const now = moment().format();

    if (!moment(expiresAt).isAfter(moment(now))) expiresAt = moment(expiresAt).add(1, "day").format();

    return expiresAt;
  };

  submitSlide3 = (location, address) => {
    //check if there are any errors
    if (this.setSlide3Errors()) return;

    //if no errors
    this.addEventProperties(
      "events__create-event-modal__slide3__form",
      "place",
    );

    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        location,
        address,
      }
     }));

    this.props.setCurrentSlide("4");
  };

  setSlide3Errors = () => {
    this.props.clearErrors();

    const form = document.getElementsByClassName("events__create-event-modal__slide3__form")[0];
    const place = form.elements.place.value;



    let errorsPresent = false;

    if (!place || place.length < 1 || parseInt(place) === parseInt(place)) {
      errorsPresent = true;
      this.props.setPlaceError('Please enter a place for your event.');
    };

    return errorsPresent;
  };

  setLocationAndAddress = (location, address) => {

    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        location,
        address
      }
     }));
  };

  submitSlide4 = async () => {

    this.addEventProperties(
      "events__create-event-modal__slide4__form",
      "notes",
    );

    //add createdBy
    await this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        createdBy: {
          _id: this.props.user._id,
          name: this.props.user.name,
          ageRange: this.props.user.ageRange,
          gender: this.props.user.gender,
        },
      }
     }));

     console.log(this.state.eventUnderConstruction, 'foo');

    this.submitEvent();
  };

  submitEvent = async () => {
    if (this.props.myEvent._id) {

      //get _id put it into the state object as well
      await this.setState((prevState) => ({
        eventUnderConstruction: {
          ...prevState.eventUnderConstruction,
          _id: this.props.myEvent._id,
        }
       }));
    }

    this.props.socket.emit ('submitEvent', {user: this.props.user, event: this.state.eventUnderConstruction}, (err, successMessage, res) => {
      if (err) {
        this.props.setSubmitError({ submitError: err });
      } else {
        this.props.setSubmitSuccess({ submitSuccess: successMessage });

        //get the _id and add it to redux myEvent
        const myEvent = {
          ...this.state.eventUnderConstruction,
          _id: res._id,
        };
        this.props.setMyEvent(myEvent);

        this.props.setCurrentSlide("1");

        //add myEvent to persistState (be sure to get it back on each page in componentDidMount!)
        this.props.socket.emit('setMyEvent', myEvent);

        this.setState(() => ({
          eventUnderConstruction: {}
        }));
        this.closeModal();
      }
    });
  };

  closeModal = () => {
    this.props.setMode(undefined);
    this.props.clearErrors();
    this.props.setCurrentSlide("1");
  }

  render() {
    return (
      <div className = "create-event-modal__form">

        {(this.props.currentSlide === "1") && <Slide1
          title = {this.props.myEvent.title}
          titleError = {this.props.titleError}

          minimumPeople = {this.props.myEvent.minimumPeople}
          minimumPeopleError = {this.props.minimumPeopleError}

          maximumPeople = {this.props.myEvent.maximumPeople}
          maximumPeopleError = {this.props.maximumPeopleError}

          submitSlide1 = {this.submitSlide1}
          closeModal = {this.closeModal}
        />}

        {(this.props.currentSlide === "2") && <Slide2
          expiresAtHour = {this.props.myEvent.expiresAtHour}
          expiresAtMinute = {this.props.myEvent.expiresAtMinute}
          expiresAtAM = {this.props.myEvent.expiresAtAM}
          expiresAtError = {this.props.expiresAtError}

          submitSlide2 = {this.submitSlide2}
          closeModal = {this.closeModal}
        />}

        {(this.props.currentSlide === "3") && <Slide3
          place = {this.props.myEvent.place}
          placeError = {this.props.placeError}

          setLocationAndAddress = {this.setLocationAndAddress}
          submitSlide3 = {this.submitSlide3}
          closeModal = {this.closeModal}
        />}

        {(this.props.currentSlide === "4") && <Slide4
          notes = {this.props.myEvent.notes}

          submitError = {this.props.submitError}

          submitSlide4 = {this.submitSlide4}
          closeModal = {this.closeModal}
        />}

      </div>
    );
  };
};

const mapStateToProps = ((reduxState) => ({
  socket: reduxState.socketReducer.socket,

  submitError: reduxState.eventsReducer.submitError,

  myEvent: reduxState.myEventReducer.myEvent,
  user: reduxState.userReducer.user,

  expiresAtError: reduxState.eventsFormErrorsReducer.expiresAtError,
  titleError: reduxState.eventsFormErrorsReducer.titleError,
  placeError: reduxState.eventsFormErrorsReducer.placeError,
  minimumPeopleError: reduxState.eventsFormErrorsReducer.minimumPeopleError,
  maximumPeopleError: reduxState.eventsFormErrorsReducer.maximumPeopleError,

  currentSlide: reduxState.eventsFormReducer.currentSlide,

}));

const mapDispatchToProps = {
  setCurrentSlide,
  setMode,

  setSubmitError,
  setSubmitSuccess,

  setExpiresAtError,
  setTitleError,
  setPlaceError,
  setMinimumPeopleError,
  setMaximumPeopleError,
  clearErrors,

  setMyEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsForm);
