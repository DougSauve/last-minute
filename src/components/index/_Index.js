import React from 'react';

import './_Index.scss';

import { connect } from 'react-redux';
import { setEvents } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser } from '../../redux/user';

import { loadState, getAllEventsFromDB } from '../_common/loadState';

import TitleBar from '../_common/TitleBar';
import EventsList from './EventsList';
import Modal from '../_common/modal/_Modal';
import DetailsModal from './DetailsModal';
import Footer from '../_common/Footer';

import LinkButtonContainer from './LinkButtonContainer';


// The index page shows a list of all open events within 10mi (can be changed). The user can respond to these by joining an event or by adding a question/comment. They can also flag open events or comments.
// It also shows a link to the profile and events pages.

class Index extends React.Component {

  state = {
    showDetailsModal: false,
    showOnMap: false,
    detailsEvent: undefined,
    stateLoaded: false,
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(() => this.setState(() => ({ stateLoaded: true })));
  };

  showDetailsModal = async (event) => {
    await this.setState(() => ({ showDetailsModal: true, detailsEvent: event }));
  };

  setShowOnMap = (value) => {
    this.setState(() => ({ showOnMap: value }));
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to see the map.');
  };

  getUserFriendlyMaxMinPeople = (min, max) => {
    if (!max) return min + '+';
    else return min + ' - ' + max;
  };

  addAttendeeToEvent = (attendee, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('addAttendeeToEvent', {attendee, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  addAttendingEventToUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('addAttendingEventToUser', {user, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    })
  };

  deleteAttendeeFromEvent = (attendee, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('DeleteAttendeeFromEvent', {attendee, event}, (err, res) => {
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

  joinEvent = async () => {
    let user = this.props.user;
    let event = this.state.detailsEvent;

    const addAttendeeToEventResult = await this.addAttendeeToEvent(user, event);
    if (addAttendeeToEventResult === null) return;

    const addAttendingEventToUserResult = await this.addAttendingEventToUser(user, event);
    if (addAttendingEventToUserResult === null) return;

    console.log('resetting user to: ', addAttendingEventToUserResult);

    Promise.all([
      //reset user in session storage
      this.props.socket.emit('setCurrentUser', addAttendingEventToUserResult, () => console.log('session user updated.')),
      //reset user in redux
      this.props.setUser(addAttendingEventToUserResult),
      //reset events from db to redux
      getAllEventsFromDB(this.props.socket, this.props.setEvents)
    ]).then(() => {
      console.log('You have joined this event.');
      this.closeModal();
    });
  };

  cancelJoinEvent = async () => {
    let user = this.props.user;
    let event = this.state.detailsEvent;

    const deleteAttendeeFromEventResult = await this.deleteAttendeeFromEvent(user, event);
    if (deleteAttendeeFromEventResult === null) return;

    const deleteEventFromUserResult = await this.deleteEventFromUser(user, event);
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
      this.closeModal();
    });
  };

  userHasJoinedEvent = () => {
    let joinedEvent = false;

    this.state.detailsEvent.attendees.forEach((attendee) => {
      if (attendee._id === this.props.user._id) joinedEvent = true;
    });

    return joinedEvent;
  }

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
        if (item !== 'stateLoaded') stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };

  render() {
    return(
      <div className = "index">

        <TitleBar
          title = "Open Events"
          titleClass = "index__title"
          showLogout = {true}
        />

        <LinkButtonContainer />

        {(this.state.stateLoaded) &&
          <EventsList
            events = {this.props.events}
            showDetailsModal = {this.showDetailsModal}
          />
        }

        {(this.state.showDetailsModal) &&
          <Modal>
            <DetailsModal
              event = {this.state.detailsEvent}
              getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}
              joinEvent = {this.joinEvent}
              userHasJoinedEvent = {this.userHasJoinedEvent}
              cancelJoinEvent = {this.cancelJoinEvent}
              closeModal = {this.closeModal}

              setShowOnMap = {this.setShowOnMap}
              showOnMap = {this.state.showOnMap}
              showNoInternetAlert = {this.showNoInternetAlert}
            />
          </Modal>

        }

        <Footer />

      </div>
    );
  };
};

const mapStateToProps = (reduxStore) => ({
  myEvent: reduxStore.myEventReducer.myEvent,
  events: reduxStore.eventsReducer.events,
  socket: reduxStore.socketReducer.socket,
  user: reduxStore.userReducer.user,
});
const mapDispatchToProps = {
  setEvents,
  setMyEvent,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
