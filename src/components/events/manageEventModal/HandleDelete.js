import React from 'react';
const socket = io();

import { connect } from 'react-redux';
import { setMode, setSubmitError, setSubmitSuccess } from '../../../redux/events';
import { setMyEvent } from '../../../redux/myEvent';

class HandleDelete extends React.Component {

  deleteEvent = () => {
    socket.emit ('deleteEvent', this.props.event_id, (err, res) => {
      if (err) {
        this.props.setSubmitError({ submitError: err });
      } else {
        this.props.setSubmitSuccess({ submitSuccess: `${res.title} has been removed.` });

        //set myEvent to undefined
        this.props.setMyEvent();

        //close the modal
        this.props.setMode(undefined);
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
  mode: reduxState.eventsReducer.mode,
  submitError: reduxState.eventsReducer.submitError,

  eventTitle: reduxState.myEventReducer.myEvent.title,
  event_id: reduxState.myEventReducer.myEvent._id,
}));
const mapDispatchToProps = {
  setMode,
  setSubmitError,
  setSubmitSuccess,

  setMyEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleDelete);
