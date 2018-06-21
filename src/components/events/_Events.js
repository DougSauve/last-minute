import React, { Component } from 'react';
import './_Events.scss';

import { connect } from 'react-redux';
import { setMode, setEvents, addEvent } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser, setUserSubmitError, setUserSubmitSuccess } from '../../redux/user';

import { loadState, getAllEventsFromDB } from '../_common/loadState';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import MyEvent from './MyEvent';
import ActionButtonContainer from './ActionButtonContainer';
import ManageEventModal from './manageEventModal/_ManageEventModal';
import AttendingEventsList from './AttendingEventsList';

// this page displays all of a user's own events in OwnEventsList. It also provides buttons to create, edit, and delete their own events.
// Event looks like:
// Title / Content - Desktop only / Location / #min #now #max / Creator

class Events extends React.Component {

  state = {
    stateLoaded: false,
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(async () => {
      await this.setState(() => ({ stateLoaded: true }));
    });
  };

  removeUserFromEvent = (user, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('removeUserFromEvent', {user, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  removeEventFromUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('removeEventFromUser', {user, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    })
  };

  cancelJoinEvent = async (event) => {
    let user = this.props.user;

    const deleteAttendeeFromEventResult = await this.deleteAttendeeFromEvent(user, event);
    if (deleteAttendeeFromEventResult === null) return;

    const deleteEventFromUserResult = await this.deleteAttendingEventFromUser(user, event);
    if (deleteEventFromUserResult === null) return;

    console.log('resetting user to: ', deleteEventFromUserResult);

    Promise.all([
      //reset user in session storage
      this.props.socket.emit('setCurrentUser', deleteEventFromUserResult, () => console.log('session user updated.')),
      //reset user in redux
      this.props.setUser(deleteEventFromUserResult),
      //reset events from db to redux
      getAllEventsFromDB(this.props.socket, this.props.setEvents)
    ]).then(() => {
      console.log('You have left this event.');
    });
  };

  deleteAttendeeFromEvent = (attendee, event) => {

    return new Promise((resolve, reject) => {
      this.props.socket.emit('deleteAttendeeFromEvent', {attendee, event}, (err, res) => {

        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  deleteAttendingEventFromUser = (user, event) => {

    return new Promise((resolve, reject) => {
      this.props.socket.emit('deleteAttendingEventFromUser', {user, event}, (err, res) => {

        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    })
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to make a new event!');
  };

  deleteEvent = (event) => {
    this.props.socket.emit ('deleteEvent', event._id, (err, res) => {
      console.log('res1', res);
      if (err) {
        this.props.setSubmitError({ submitError: err });
      } else {
        const eventBeingDeleted = res;
        //remove event from user's attendingEvents...
        this.props.socket.emit('deleteAttendingEventFromUser', {user: this.props.user, event: eventBeingDeleted}, (err2, res2) => {
          console.log('res2', res2);
          if (err2) {
            console.log('failed at deleteAttendingEventFromUser:', err2);
          } else {
            // ...and hostedEvents
            this.props.socket.emit('deleteHostedEventFromUser', {user: res2, event: eventBeingDeleted}, (err3, res3) => {
              console.log('res3', res3);
              const updatedUser = res3;
              if (err3) {
                console.log('failed at deleteHostedEventFromUser:', err3);
              } else {
                //reset user in redux
                this.props.setUser(updatedUser);

                //reset user and myEvent in persisting state
                this.props.socket.emit('setCurrentUser', updatedUser, () => {
                  console.log('persisting user updated.');
                });
                this.props.socket.emit('setMyEvent', {}, () => {
                  console.log('persisting myEvent updated.');
                });

                //set myEvent to undefined
                this.props.setMyEvent({});

                this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
                console.log('hosted and attending events successfully removed from user.');
              };
            });
          };
        });
      }
    });
  };

  render() {
    return (
      <div className = "events">

        <TitleBar
          links = {['index']}
          showLogout = {true}
        />

        <div className = "events__success-message">{this.props.submitSuccess}</div>

        <MyEvent
          event = {this.props.myEvent}
        />

        <ActionButtonContainer
          myEventExists = {(!!this.props.myEvent.title)}
          setMode = {this.props.setMode}
          showNoInternetAlert = {this.showNoInternetAlert}
        />

        {
          (this.props.mode) &&
          <ManageEventModal
            mode = {this.props.mode}
          />
        }

        {
          (this.state.stateLoaded) && // this is using old state.
          <AttendingEventsList
            user = {this.props.user}
            events = {this.props.user.attendingEvents}
            cancelJoinEvent = {this.cancelJoinEvent}
            deleteEvent = {this.deleteEvent}
          />
        }

        <Footer />
      </div>
    );
  };
};

const mapStateToProps = (reduxState) => ({
  socket: reduxState.socketReducer.socket,

  submitSuccess: reduxState.eventsReducer.submitSuccess,
  events: reduxState.eventsReducer.events,
  mode: reduxState.eventsReducer.mode,

  user: reduxState.userReducer.user,

  myEvent: reduxState.myEventReducer.myEvent,
});
const mapDispatchToProps = {
  setMode,
  setEvents,
  setMyEvent,
  setUser,
  setUserSubmitError,
  setUserSubmitSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
