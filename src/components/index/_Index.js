import React from 'react';
import './_Index.scss';

import { connect } from 'react-redux';
import { setEvents } from '../../redux/events';
import { setMyEvent, setSubmitError, setSubmitSuccess } from '../../redux/myEvent';
import { setUser } from '../../redux/user';

import { loadState, getAllEventsFromDB } from '../_common/loadState';

import TitleBar from '../_common/TitleBar';
import EventsList from './EventsList';
import Modal from '../_common/modal/_Modal';
import DetailsModal from './DetailsModal';
import Footer from '../_common/Footer';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';
import makeAgeRangeUserFriendly from '../../../utils/makeAgeRangeUserFriendly';
import joiningEvents from '../_common/joiningEvents';

// The index page shows a list of all open events within 10mi (can be changed). The user can respond to these by joining an event or by adding a question/comment. They can also flag open events or comments.
// It also shows a link to the profile and events pages.

class Index extends React.Component {

  state = {
    showDetailsModal: false,
    showOnMap: false,
    showDeleteModal: false,
    detailsEvent: undefined,
    stateLoaded: false,
    JE: new joiningEvents(this.props.socket, this.props.setEvents, this.props.setUser, this.props.setUserSubmitError),
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(() => this.setState(() => ({ stateLoaded: true })));
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['enter', this.logIn], ['escape', this.closeModal]);
  };

  showDetailsModal = async (event) => {
    await this.setState(() => ({ showDetailsModal: true, detailsEvent: event }));
  };

  setShowOnMap = (value) => {
    this.setState(() => ({ showOnMap: value }));
  };

  setShowDeleteModal = (value) => {
    this.setState(() => ({ showDeleteModal: value }));
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to see the map.');
  };

  getUserFriendlyMaxMinPeople = (min, max) => {
    if (!max) return min + '+';
    else return min + ' - ' + max;
  };

  deleteEvent = () => {
    this.props.socket.emit ('deleteEvent', this.state.detailsEvent._id, (err, res) => {
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

                //reload the events list
                getAllEventsFromDB(this.props.socket, this.props.setEvents);

                //close the modal
                this.closeModal();
                this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
                console.log('hosted and attending events successfully removed from user.');
              };
            });
          };
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
        if (item !== 'stateLoaded' && item !== 'JE') stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };

  render() {
    return(
      <div className = "index">

        <TitleBar
          links = {['events', 'profile']}
          showLogout = {true}
        />

        <div className = "top-2rem success">{this.props.submitSuccess}</div>

        <div className = "header">
          <div className = "size3">
            Open Events
          </div>
        </div>

        {(this.state.stateLoaded) &&
          <EventsList
            events = {this.props.events}
            showDetailsModal = {this.showDetailsModal}
            user = {this.props.user}
          />
        }

        {(this.state.showDetailsModal) &&
          <Modal
            close = {this.closeModal}
          >
            <DetailsModal
              event = {this.state.detailsEvent}
              getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}
              joinEvent =
              {this.state.JE.joinEvent.bind(this, this.props.user, this.state.detailsEvent, this.closeModal)}
              userHasJoinedEvent = {this.userHasJoinedEvent}
              user = {this.props.user}
              leaveEvent =
              {this.state.JE.leaveEvent.bind(this, this.props.user, this.state.detailsEvent, this.closeModal)}
              deleteEvent = {this.deleteEvent}
              closeModal = {this.closeModal}

              setShowOnMap = {this.setShowOnMap}
              showOnMap = {this.state.showOnMap}

              setShowDeleteModal = {this.setShowDeleteModal}
              showDeleteModal = {this.state.showDeleteModal}

              showNoInternetAlert = {this.showNoInternetAlert}
              userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.state.detailsEvent.createdBy.ageRange)}
              makeAgeRangeUserFriendly = {makeAgeRangeUserFriendly}
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
  submitSuccess: reduxStore.eventsReducer.submitSuccess,
});
const mapDispatchToProps = {
  setEvents,
  setMyEvent,
  setUser,
  setSubmitError,
  setSubmitSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
