import React from 'react';
import moment from 'moment';

import './_EventsForm.scss';

import { connect } from 'react-redux';
import { setMode, setEvents, setSubmitError, setSubmitSuccess } from '../../../../redux/events';
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
import { setUser } from '../../../../redux/user';

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

  submitSlide1 = () => {
    //get info from Slide1 form
    const form = document.getElementsByClassName('events__slide1__form')[0];
    const title = form.elements.title.value;
    const minimumPeople = form.elements.minimumPeople.value;
    const maximumPeople = form.elements.maximumPeople.value;

    //check if there are any errors
    if (this.setSlide1Errors(title, minimumPeople, maximumPeople)) return;

    //if no errors, set to state
    this.setState(() => ({ eventUnderConstruction: { title, minimumPeople, maximumPeople } }));

    this.props.setCurrentSlide("2");
  };
  setSlide1Errors = (title, minimumPeople, maximumPeople) => {
    this.props.clearErrors();

    let errorsPresent = false;

    if (!title || title.length < 1 || parseInt(title) === parseInt(title)) {
      errorsPresent = true;
      this.props.setTitleError('Please enter a name for your event.');
    };

    if (parseInt(minimumPeople) < 1) {
      errorsPresent = true;
      this.props.setMinPeopleError('Please enter a minimum number of people.');
    }

    if (parseInt(maximumPeople) < parseInt(minimumPeople)) {
      errorsPresent = true;
      this.props.setMaxPeopleError('The maximum number of people can\'t be less than the minimum!');
    };

    return errorsPresent;
  };

  submitSlide2 = () => {
    //get info from Slide2 form
    const form = document.getElementsByClassName("events__slide2__form")[0];
    const expiresAtHour = form.elements.expiresAtHour.value;
    const expiresAtMinute = form.elements.expiresAtMinute.value;
    const expiresAtAM = form.elements.expiresAtAM.value;

    //check if there are any errors
    if (this.setSlide2Errors(expiresAtHour, expiresAtMinute, expiresAtAM)) return;

    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        expiresAtHour,
        expiresAtMinute,
        expiresAtAM,
        expiresAt: this.assembleExpiresAt(expiresAtHour, expiresAtMinute, expiresAtAM),
      }
     }));

    this.props.setCurrentSlide("3");
  };
  setSlide2Errors = (expiresAtHour, expiresAtMinute, expiresAtAM) => {
    this.props.clearErrors();

    let errorsPresent = false;

    if (!expiresAtHour || !expiresAtMinute || !expiresAtAM) {
      errorsPresent = true;
      this.props.setExpiresAtError('Please choose a time for your event.');
    };

    return errorsPresent;
  };
  assembleExpiresAt = (hour, minute, am) => {

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

  submitSlide3 = (place, location, address) => {

    console.log('things', place, location, address);

    //check if there are any errors
    if (this.setSlide3Errors(place)) return false;

    this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        location,
        address,
        place,
      }
     }));

    this.props.setCurrentSlide("4");
    return true;
  };
  setSlide3Errors = (place) => {
    this.props.clearErrors();

    let errorsPresent = false;

    if (!place || place.length < 1 || parseInt(place) === parseInt(place)) {
      errorsPresent = true;
      this.props.setPlaceError('Please enter a place for your event.');
    };

    return errorsPresent;
  };

  submitSlide4 = async () => {

    const notes = document.getElementsByClassName(
      "events__slide4__form")[0].elements.notes.value;

    //add notes and createdBy, and myEvent's _id (only there if this is an update)
    await this.setState((prevState) => ({
      eventUnderConstruction: {
        ...prevState.eventUnderConstruction,
        notes,
        createdBy: {
          _id: this.props.user._id,
          name: this.props.user.name,
          ageRange: this.props.user.ageRange,
          gender: this.props.user.gender,
        },
        _id: (this.props.myEvent._id) && this.props.myEvent._id,
      }
     }));

    this.submitEvent();
  };


  submitEvent = async () => {

    //submit event > createEvent, which also adds the user as createdBy, completing the event.
    const submittedEvent = await new Promise((resolve, reject) => {

      this.props.socket.emit ('submitEvent', {user: this.props.user, event: this.state.eventUnderConstruction}, (err, res) => {
        if (err) {
          console.log('_EventsForm.js submitEvent error:', err);
          this.props.setSubmitError({ submitError: 'An error occurred while creating the event.' });
          reject(null);
        } else {
          this.props.setSubmitSuccess({ submitSuccess: `${res.title} was ${this.props.mode}d.` });
          resolve(res);
        };
      });
    });

    console.log('submittedEvent', submittedEvent);

    if(!submittedEvent) return console.log('no submitted Event');

    //also need to update the user: add the new event to user/attendingEvents...
    // const addAttendingEventToUserResult = await this.createOrUpdateAttendingEvents(
    //   this.props.user, submittedEvent);
    //
    // if(!addAttendingEventToUserResult) return console.log('addAttendingEventToUser call failed.');

    //...and hostedEvents...
    const addHostedEventToUserResult = await this.createOrUpdateHostedEvents(
      this.props.user, submittedEvent);

    if(!addHostedEventToUserResult) return console.log('addHostedEventToUser call failed.');

    //...and add the location to meetingPlaces, if it doesn't exist.
    const addMeetingPlaceToUserResult = await this.createOrUpdateMeetingPlace(
      addHostedEventToUserResult, submittedEvent);

    if(!addMeetingPlaceToUserResult) return console.log('addMeetingPlaceToUser call failed.');

    //all four calls went well, now redux and session state need to be updated.
    console.log('submittedEvent', submittedEvent)
    console.log('addMeetingPlaceToUserResult', addMeetingPlaceToUserResult);

    //set redux.myEvent and session state to eventUnderConstruction
    this.props.setMyEvent(submittedEvent);
    this.props.socket.emit('setMyEvent', submittedEvent);

    // //add event to redux.events
    // this.props.setEvents(this.props.events.concat(myEvent));
    console.log('events:', this.props.events);
    console.log('myEvent', submittedEvent);

    //add the user to redux as well
    this.props.setUser(addMeetingPlaceToUserResult);
    this.props.socket.emit('setCurrentUser', addMeetingPlaceToUserResult,
    () => {console.log('event created and user updated.')});

    this.props.setCurrentSlide("1");
    this.setState(() => ({ eventUnderConstruction: {} }));
    this.closeModal();

    //now all associated users need to have the event updated as well.
    this.updateAssociatedUsers(submittedEvent);

    this.props.socket.emit('updateHostedEventOnUser', { user: this.props.user, event: submittedEvent }, (err, res) => {
      console.log('hosting user updated:', res);
    });
  };

  updateAssociatedUsers = (event) => {
    //loop through attendees, for each one update their attendingEvents on their user in the db
    event.attendees.forEach((attendee) => {
      if (JSON.stringify(attendee._id) !== JSON.stringify(this.props.user._id)) {
        this.props.socket.emit('readUser', attendee._id, (err, res) => {
          this.props.socket.emit('updateAttendingEventOnUser', {user: res, event}, (err2, res2) => {
            console.log('associated user updated:', res2);
          });
        });
      };
    });
  };

  createOrUpdateAttendingEvents = async (user, submittedEvent) => {

    if (this.doesAttendingEventExist(submittedEvent._id)) {
      return user;
    } else {
      const addAttendingEventToUserResult = await new Promise((resolve, reject) => {
        this.props.socket.emit('addAttendingEventToUser', {
          user,
          event: submittedEvent
        }, (err, res) => {
          if (err) {
            reject(null);
          }else{
            resolve(res);
          };
        });
      });
      return addAttendingEventToUserResult;
    };
  };

  createOrUpdateHostedEvents = async (addAttendingEventToUserResult, submittedEvent) => {
    let addHostedEventToUserResult;

    if (this.doesHostedEventExist(submittedEvent._id)) {

      console.log('hosted event already exists.');
      addHostedEventToUserResult = addAttendingEventToUserResult;

    } else {

      addHostedEventToUserResult = await new Promise((resolve, reject) => {
        this.props.socket.emit('addHostedEventToUser', {
          user: addAttendingEventToUserResult,
          event: submittedEvent
        }, (err, res) => {
          if (err) {
            reject(null);
          }else{
            resolve(res);
          };
        });
      });
    };
    return addHostedEventToUserResult;
  };

  createOrUpdateMeetingPlace = async (addHostedEventToUserResult, submittedEvent) => {
    let addMeetingPlaceToUserResult;

    if (this.doesMeetingPlaceExist(submittedEvent.place)) {

      console.log('meeting place already exists.');
      addMeetingPlaceToUserResult = addHostedEventToUserResult;

    } else {

      addMeetingPlaceToUserResult = await new Promise((resolve, reject) => {
        this.props.socket.emit('addMeetingPlaceToUser', {
          user: addHostedEventToUserResult,
          meetingPlace: {
            name: submittedEvent.place,
            location: submittedEvent.location,
            address: submittedEvent.address,
          },
        }, (err, res) => {
          if (err) {
            reject(null);
          }else{
            resolve(res);
          };
        });
      });
    };
    return addMeetingPlaceToUserResult;
  };

  doesAttendingEventExist(submittedEventID){
    let attendingEventExists = false;

    this.props.user.attendingEvents.map((currentAttendingEvent) => {
      if ( JSON.stringify(currentAttendingEvent._id) === JSON.stringify(submittedEventID)) attendingEventExists = true;
    });

    return attendingEventExists;
  };

  doesHostedEventExist(submittedEventID){
    let hostedEventExists = false;

    this.props.user.hostedEvents.map((currentHostedEvent) => {
      if ( JSON.stringify(currentHostedEvent._id) === JSON.stringify(submittedEventID)) hostedEventExists = true;
    });

    return hostedEventExists;
  };

  doesMeetingPlaceExist(place){
    let meetingPlaceExists = false;

    this.props.user.meetingPlaces.map((currentMeetingPlace) => {
      if (currentMeetingPlace.name === place) meetingPlaceExists = true;
    });

    return meetingPlaceExists;
  };

  closeModal = () => {
    this.props.setMode(undefined);
    this.props.clearErrors();
    this.props.setCurrentSlide("1");
  };

  render() {
    return (
      <div>

        {(this.props.currentSlide === "1") &&
        <Slide1

          title = {this.props.myEvent.title}
          minimumPeople = {this.props.myEvent.minimumPeople}
          maximumPeople = {this.props.myEvent.maximumPeople}

          titleError = {this.props.titleError}
          minimumPeopleError = {this.props.minimumPeopleError}
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

  mode: reduxState.eventsReducer.mode,
  events: reduxState.eventsReducer.events,
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
  setEvents,
  setSubmitError,
  setSubmitSuccess,

  setExpiresAtError,
  setTitleError,
  setPlaceError,
  setMinimumPeopleError,
  setMaximumPeopleError,
  clearErrors,

  setMyEvent,

  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsForm);
