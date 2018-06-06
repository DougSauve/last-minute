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

  getUserFriendlyMaxMinPeople = (min, max) => {
    if (!max) return min + '+';
    else return min + ' - ' + max;
  };

  addUserToEvent = (user, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('addUserToEvent', {user, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  addEventToUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('addEventToUser', {user, event}, (err, res) => {
        if (err) return this.props.setUserSubmitError(err);
        resolve(res);
      });
    })
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

  joinEvent = async () => {
    let user = this.props.user;
    let event = this.state.detailsEvent;

    const addUserToEventResult = await this.addUserToEvent(user, event);
    if (addUserToEventResult === null) return;

    const addEventToUserResult = await this.addEventToUser(user, event);
    if (addEventToUserResult === null) return;

    console.log('resetting user to: ', addEventToUserResult);

    Promise.all([
      //reset user in session storage
      this.props.socket.emit('setCurrentUser', addEventToUserResult, () => console.log('session user updated.')),
      //reset user in redux
      this.props.setUser(addEventToUserResult),
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

    const removeUserFromEventResult = await this.removeUserFromEvent(user, event);
    if (removeUserFromEventResult === null) return;

    const removeEventFromUserResult = await this.removeEventFromUser(user, event);
    if (removeEventFromUserResult === null) return;

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
