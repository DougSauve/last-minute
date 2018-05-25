import React, { Component } from 'react';
const socket = io();

import { connect } from 'react-redux';
import { setMode, setEvents, addEvent } from '../../redux/events';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import MyEvent from './MyEvent';
import ActionButtonContainer from './ActionButtonContainer';
import ManageEventModal from './manageEventModal/_ManageEventModal';

// this page displays all of a user's own events in OwnEventsList. It also provides buttons to create, edit, and delete their own events.
// Event looks like:
// Title / Content - Desktop only / Location / #min #now #max / Creator

const Events = (props) => (
  <div className = "events">

    <TitleBar
      showBackToIndex = {true}
      title = "Events"
      titleClass = "events__title"
      showLogout = {true}
    />

    <div className = "events__success-message">{props.submitSuccess}</div>

    <MyEvent
      event = {props.myEvent}
    />

    <ActionButtonContainer
      myEventExists = {(!!props.myEvent.title)}
      setMode = {props.setMode}
    />

    {(props.mode) &&
      <ManageEventModal
        mode = {props.mode}
      />}

    <Footer />
  </div>
);

const mapStateToProps = (reduxState) => ({
  submitSuccess: reduxState.eventsReducer.submitSuccess,
  events: reduxState.eventsReducer.events,
  mode: reduxState.eventsReducer.mode,

  myEvent: reduxState.myEventReducer.myEvent,
});
const mapDispatchToProps = {
  setMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
