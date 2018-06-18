import React, { Component } from 'react';

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

    const removeUserFromEventResult = await this.removeUserFromEvent(user, event);
    if (removeUserFromEventResult === null) return console.log('could not remove user from event.');

    const removeEventFromUserResult = await this.removeEventFromUser(user, event);
    if (removeEventFromUserResult === null) return console.log('could not remove event from user.');

    console.log('resetting user to: ', removeEventFromUserResult);

    Promise.all([
      //reset user in session storage
      this.props.socket.emit('setCurrentUser', removeEventFromUserResult, () => console.log('session user updated.')),
      //reset user in redux
      this.props.setUser(removeEventFromUserResult),
      //reset events from db to redux
      getAllEventsFromDB(this.props.socket, this.props.setEvents)
    ]).then(() => {
      console.log('You have left this event.');
    });
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to make a new event!');
  };

  render() {
    return (
      <div className = "events">

        <TitleBar
          showBackToIndex = {true}
          title = "Events"
          titleClass = "events__title"
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
          events = {this.props.user.attendingEvents}
          cancelJoinEvent = {this.cancelJoinEvent}
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
  setUserSubmitSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
