import React from 'react';

import { connect } from 'react-redux';
import { setMode, setSubmitError, setSubmitSuccess } from '../../../redux/events';
import { setMyEvent } from '../../../redux/myEvent';
import { setUser } from '../../../redux/user';

class HandleDelete extends React.Component {

  deleteEvent = () => {
    //remove event from database
    
    this.props.socket.emit ('deleteEvent', this.props.myEvent._id, (err, res) => {
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

                //close the modal
                this.props.setMode(undefined);
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
      <div className = "create-react-modal__handle-delete">

        <div className = "events__submit-error">
          {this.props.submitError}
        </div>

        <div className = "create-react-modal__delete-button__message">
          Are you sure you want to remove your event '{this.props.eventTitle}'?
        </div>

        <div
          className = "manage-event-modal__cancel-button"
          onClick = { () => {
            this.props.setMode(undefined);
            this.props.setSubmitError('');
          }}
        >
          Cancel
        </div>

        <div
          className = "events__delete-modal__delete-button"
          onClick = {this.deleteEvent}
        >
          Delete Event
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
  setSubmitError,
  setSubmitSuccess,

  setMyEvent,

  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleDelete);
