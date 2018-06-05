import React from 'react';

import './_Index.scss';

import { connect } from 'react-redux';
import { setEvents } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser } from '../../redux/user';

// import loadState from '../_common/loadState';

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
    this.loadState();
  };

  loadState = () => {
    let user;
    let myEvent;

    Promise.all([
      // this.getAllEventsFromDB(),
      this.getUserFromSession(),
      this.getMyEventFromSession(),
      this.getAllEventsFromDB()
    ])
    .then( async (res) => {
      user = res[0];
      myEvent = res[1];

      if (myEvent === null) {
        myEvent = await this.getMyEventFromDB(user);
      };

      this.setState(() => ({ stateLoaded: true }));
    });
  };

  getUserFromSession = () => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('getCurrentUser', async (userFromSession) => {
        if (!userFromSession) reject(window.location.pathname = '/');
        await this.props.setUser(userFromSession);
        resolve(userFromSession);
      });
    });
  };
  getMyEventFromSession = () => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('getMyEvent', async (myEvent) => {
        if (!myEvent) resolve(null);
        await this.props.setMyEvent(myEvent);
        resolve(myEvent);
      });
    });
  };
  getMyEventFromDB = (sessionUser) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('readUser', sessionUser._id, async (err, user) => {
        if (err) resolve(err);
        if (user.hostedEvents[0]) {
          await this.props.setMyEvent(user.hostedEvents[0]);
          resolve(user.hostedEvents[0]);
        } else {
          resolve(null);
        }
      });
    });
  };
  getAllEventsFromDB = () => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit('readAllEvents', async (err, res) => {
        if (err) resolve(err)
        await this.props.setEvents(res);
        resolve(true);
      });
    });
  };

  showDetailsModal = async (event) => {
    await this.setState(() => ({ showDetailsModal: true, detailsEvent: event }));
  };

  getUserFriendlyMaxMinPeople = (min, max) => {
    if (!max) return min + '+';
    else return min + ' - ' + max;
  };

  joinEvent = () => {
    //add event to user's attendingEvents list (do this on event creation too!)
    this.props.socket.emit('addUserToEvent', {user: this.props.user, event: this.state.detailsEvent}, async (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('addEventToUser', {user: this.props.user, event: this.state.detailsEvent}, async (err2, res2) => {
          if (err2) {
            this.props.setUserSubmitError(err2);
          } else {
            console.log('resetting user to: ', res2);
            await this.props.setUser(res2);
            await this.getAllEventsFromDB();
            console.log('You have joined this event. Result:', res);
            this.closeModal();
          }
        });
      }
    });
  };

  cancelJoinEvent = () => {
    this.props.socket.emit('removeEventFromUser', {user: this.props.user, event: this.state.detailsEvent}, async (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('removeUserFromEvent', {user: this.props.user, event: this.state.detailsEvent}, async (err2, res2) => {
          if (err2) {
            this.props.setUserSubmitError(err2);
          } else {
            await this.props.setUser(res);
            await this.getAllEventsFromDB();
            console.log('You have unjoined this event. Result:', res2);
            this.closeModal();
          }
        });
      }
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
        stateToChange[item] = false;
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
