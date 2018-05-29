import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setMode, setEvents, addEvent } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import MyEvent from './MyEvent';
import ActionButtonContainer from './ActionButtonContainer';
import ManageEventModal from './manageEventModal/_ManageEventModal';

// this page displays all of a user's own events in OwnEventsList. It also provides buttons to create, edit, and delete their own events.
// Event looks like:
// Title / Content - Desktop only / Location / #min #now #max / Creator

class Events extends React.Component {
  componentWillMount() {
    //get myEvent from db and set it to redux state
    this.props.socket.emit('getMyEvent', (myEvent) => {
      if (myEvent) this.props.setMyEvent(myEvent);
    });
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
        />

        {(this.props.mode) &&
          <ManageEventModal
            mode = {this.props.mode}
          />}

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

  myEvent: reduxState.myEventReducer.myEvent,
});
const mapDispatchToProps = {
  setMode,
  setMyEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
