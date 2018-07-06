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

  deleteAttendingEventFromAssociatedUsers = (event) => {
    return new Promise((resolve, reject) => {
      event.attendees.forEach((attendee, index) => {
        this.props.socket.emit('readUser', attendee._id, (err, res) => {
          if (err) reject('err:', err);

          this.props.socket.emit('deleteAttendingEventFromUser', { user: res, event }, (err2, res2) => {
            if (err2) reject('err2:', err2);
            if (index === event.attendees.length -1) resolve(true);
          });
        });
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

  deleteEvent = async() => {

    //Database operations
console.log('in delete');
    //remove the attending event from all associated users, including the host
    const success = await this.deleteAttendingEventFromAssociatedUsers(this.props.myEvent);
console.log('z');
    if (!success) return;
console.log('a');
//remove the event from the host
const updatedUser = await this.deleteEventFromHost(this.props.myEvent, this.props.user);
console.log('x');
if (!updatedUser) return;
console.log('f');
    //remove event from database
    const eventBeingDeleted = await this.deleteEventFromDB(this.props.myEvent);
console.log('y');
    if (!eventBeingDeleted) return;
console.log('b');
    // Redux Operations

    //set user to user without the removed event
    this.props.setUser(updatedUser);

    //set myEvent to undefined
    this.props.setMyEvent({});

    //reset event list
    getAllEventsFromDB(this.props.socket, this.props.setEvents);
console.log('c');
    //Persisting State Operations

    //reset user and myEvent in persisting state
    this.props.socket.emit('setCurrentUser', updatedUser, () => {});
    this.props.socket.emit('setMyEvent', {} );

    //Close Modals
console.log('d');
    //in /events
    (this.props.setMode) && this.props.setMode(undefined);

    //detailsModal in /index
    (this.props.closeModal) && this.props.closeModal();

    //delete event modal
    (this.props.close) && this.props.close();
console.log('e');
    //Success Message
    this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
  };

  // deleteEvent = () => {
  //   //remove the event from all associated users
  //   this.props.myEvent.attendees.forEach((attendee) => {
  //     this.props.socket.emit('readUser', attendee._id, (err4, res4) => {
  //       this.props.socket.emit('deleteAttendingEventFromUser', { user: res4, event: this.props.myEvent }, (err5, res5) => {
  //         console.log('associated user updated:', res5);
  //
  //         //remove event from database
  //         this.props.socket.emit ('deleteEvent', this.props.myEvent._id, (err, res) => {
  //           console.log('res1', res);
  //           if (err) {
  //             this.props.setSubmitError({ submitError: err });
  //           } else {
  //             const eventBeingDeleted = res;
  //             //remove event from user's attendingEvents...
  //             this.props.socket.emit('deleteAttendingEventFromUser', {user: this.props.user, event: eventBeingDeleted}, (err2, res2) => {
  //               console.log('res2', res2);
  //               if (err2) {
  //                 console.log('failed at deleteAttendingEventFromUser:', err2);
  //               } else {
  //                 // ...and hostedEvents
  //                 this.props.socket.emit('deleteHostedEventFromUser', {user: res2, event: eventBeingDeleted}, (err3, res3) => {
  //                   console.log('res3', res3);
  //                   const updatedUser = res3;
  //                   if (err3) {
  //                     console.log('failed at deleteHostedEventFromUser:', err3);
  //                   } else {
  //                     //reset user in redux
  //                     this.props.setUser(updatedUser);
  //
  //                     //reset user and myEvent in persisting state
  //                     this.props.socket.emit('setCurrentUser', updatedUser, () => {
  //                       console.log('persisting user updated.');
  //                     });
  //                     this.props.socket.emit('setMyEvent', {}, () => {
  //                       console.log('persisting myEvent updated.');
  //                     });
  //
  //                     //set myEvent to undefined
  //                     this.props.setMyEvent({});
  //
  //                     //reset event list
  //                     getAllEventsFromDB(this.props.socket, this.props.setEvents);
  //
  //                     //close the modals
  //                     //in /events
  //                     this.props.setMode(undefined);
  //                     this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
  //
  //                     //detailsModal in /index
  //                     this.props.closeModal();
  //                     //this modal
  //                     (this.props.close) && this.props.close();
  //                     console.log('hosted and attending events successfully removed from user.');
  //                   };
  //                 });
  //               };
  //             });
  //           }
  //         });
  //       });
  //     });
  //   });
  // };

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
