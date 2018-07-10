import React from 'react';

import { connect } from 'react-redux';
import { setMode, setEvents, setSubmitError, setSubmitSuccess } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser } from '../../redux/user';

import { getAllEventsFromDB } from './loadState';

class DeleteEventModal extends React.Component {
  //props: {
  // close: (function)
// }

  deleteAttendingEventFromAssociatedUsers = async (event, host) => {
    return new Promise((resolve, reject) => {
      event.attendees.forEach((attendee, index) => {
        //if attendee is not the user - because this doesn't exist on the host.
        if(JSON.stringify(attendee._id) !== JSON.stringify(host._id)) {
          this.props.socket.emit('readUser', attendee._id, (err, res) => {
            if (err) reject('err:', err);

            this.props.socket.emit('deleteAttendingEventFromUser', { user: res, event }, (err2, res2) => {
              if (err2) {
                reject('err2', err2)
              } else {
                if (index === event.attendees.length -1) {
                  resolve(true);
                };
              };
            });
          });
        } else {
          if (index === event.attendees.length -1) {
            resolve(true);
          };
        };
      });
    });
  };

  deleteEventFromHost = (event, host) => {
    return new Promise((resolve, reject) => {
      event.attendees.forEach((attendee) => {
        this.props.socket.emit('readUser', attendee._id, (err, res) => {
          if (err) reject('err:', err);

          if (attendee._id === host._id) {
            this.props.socket.emit('deleteHostedEventFromUser', { user: host, event }, (err2, res2) => {
              if (err2) reject('err2:', err2);
              resolve(res2);
            });
          };
        });
      });
    });
  };

  deleteEventFromDB = (event) => {
    return new Promise((resolve, reject) => {
      this.props.socket.emit ('deleteEvent', event._id, (err, res) => {
        if (err) {
          this.props.setSubmitError({ submitError: err });
          reject('err:', err);
        } else {
          resolve(res);
        };
      });
    });
  };

  deleteEvent = async () => {

    //Database operations

    //remove the attending event from all associated users
    const success = await this.deleteAttendingEventFromAssociatedUsers(this.props.myEvent, this.props.user);

    if (!success) return;

//remove the event from the host
const updatedUser = await this.deleteEventFromHost(this.props.myEvent, this.props.user);

if (!updatedUser) return;

    //remove event from database
    const eventBeingDeleted = await this.deleteEventFromDB(this.props.myEvent);

    if (!eventBeingDeleted) return;

    // Redux Operations

    //set user to user without the removed event
    this.props.setUser(updatedUser);

    //set myEvent to undefined
    this.props.setMyEvent({});

    //reset event list
    getAllEventsFromDB(this.props.socket, this.props.setEvents);

    //Persisting State Operations

    //reset user and myEvent in persisting state
    this.props.socket.emit('setCurrentUser', updatedUser, () => {});
    this.props.socket.emit('setMyEvent', {} );

    //Close Modals

    //in /events
    (this.props.setMode) && this.props.setMode(undefined);

    //detailsModal in /index
    (this.props.closeModal) && this.props.closeModal();

    //delete event modal
    (this.props.close) && this.props.close();

    //Success Message
    this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
  };

  render() {

    return (
      <div className = "modal-padding center">

        <div className = "error">
          {this.props.submitError}
        </div>

        <div className = "warning">
          Are you sure you want to remove your event '{this.props.eventTitle}'?
        </div>

        <div className = "button-container">
          <div
            className = "button background-none width15"
            onClick = { () => {
              this.props.setMode(undefined);
              this.props.setSubmitError('');
              (this.props.close) && this.props.close();
            }}
          >
            Cancel
          </div>

          <div
            className = "button background-red width15"
            onClick = {this.deleteEvent}
          >
            Delete Event
          </div>
        </div>

      </div>
    );
  };
};

const mapStateToProps = ((reduxState) => ({
  socket: reduxState.socketReducer.socket,
  mode: reduxState.eventsReducer.mode,
  submitError: reduxState.eventsReducer.submitError,

  user: reduxState.userReducer.user,

  eventTitle: reduxState.myEventReducer.myEvent.title,
  myEvent: reduxState.myEventReducer.myEvent,
}));
const mapDispatchToProps = {
  setMode,
  setEvents,
  setSubmitError,
  setSubmitSuccess,

  setMyEvent,

  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventModal);
