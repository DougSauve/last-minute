import React, { Component } from 'react';
import './_Events.scss';

import { connect } from 'react-redux';
import { setMode, setEvents, addEvent } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser, setUserSubmitError, setUserSubmitSuccess } from '../../redux/user';

import { loadState, getAllEventsFromDB } from '../_common/loadState';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import MyEvent from './MyEvent';
import ActionButtonContainer from './ActionButtonContainer';
import ManageEventModal from './manageEventModal/_ManageEventModal';
import AttendingEventsList from './AttendingEventsList';

import ShowPositionOnMapModal from '../_common/maps/ShowPositionOnMapModal';
import checkMyEventForExpiry from '../_common/checkMyEventForExpiry';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';
import makeAgeRangeUserFriendly from '../../../utils/makeAgeRangeUserFriendly';
import joiningEvents from '../_common/joiningEvents';

class Events extends React.Component {

  state = {
    stateLoaded: false,
    JE: new joiningEvents(this.props.socket, this.props.setEvents, this.props.setUser, this.props.setUserSubmitError),
    mapEvent: null,
  };

  componentWillMount() {
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(async () => {
      await this.setState(() => ({ stateLoaded: true }));

      // check if a user's hosted event has expired. If it has, move it to their attendingEvents list, where it can be history.
      if (this.props.myEvent._id) {
        checkMyEventForExpiry(this.props.socket, this.props.user, this.props.setUser, this.props.setMyEvent);
      };
    });
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['escape', this.closeModal]);
    this.setStyling();
    window.addEventListener('resize', this.setStyling());
  };

  componentDidUpdate() {
    this.setStyling();
  }

  setStyling = () => {
    const container = document.getElementsByClassName('events__left-box__background__container')[0];
    container.style.minHeight = `${window.innerHeight - 144}px`;

    const rightBox = document.getElementsByClassName('events__right-box')[0];
    container.style.height = `${rightBox.clientHeight}px`;
  };

  setMapEvent = async (event) => {
    await this.setState(() => ({ mapEvent: event }));
  };

  deleteEvent = (event) => {
    this.props.socket.emit ('deleteEvent', event._id, (err, res) => {
      if (err) {
        this.props.setSubmitError({ submitError: err });
      } else {
        const eventBeingDeleted = res;
        //remove event from user's attendingEvents...
        this.props.socket.emit('deleteAttendingEventFromUser', {user: this.props.user, event: eventBeingDeleted}, (err2, res2) => {
          if (!err2){
            // ...and hostedEvents
            this.props.socket.emit('deleteHostedEventFromUser', {user: res2, event: eventBeingDeleted}, (err3, res3) => {
              const updatedUser = res3;
              if (!err3) {
                //reset user in redux
                this.props.setUser(updatedUser);

                //reset user and myEvent in persisting state
                this.props.socket.emit('setCurrentUser', updatedUser, () => {});
                this.props.socket.emit('setMyEvent', {}, () => {});

                //set myEvent to undefined
                this.props.setMyEvent({});
                this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
              };
            });
          };
        });
      }
    });
  };
  deleteAttendingEvent = (event) => {
    this.props.socket.emit('deleteAttendingEventFromUser', {user: this.props.user, event}, (err, res) => {
      if (!err) {
        //redux and persisting state
        this.props.setUser(res);
        this.props.socket.emit('setCurrentUser', res, () => {});
      };
    });
  };

  render() {
    return (
      <div className = "events">

        <TitleBar
          links = {['index']}
          showLogout = {true}
          fixed = {true}
        />

        <div className = "success">{this.props.submitSuccess}</div>

        <div className = "header--events">
          Your events
        </div>

        <div className = "events-box">

          <div className = "events__left-box__background__container">
            <div className = "events__left-box__background" />
          </div>

          <div className = "events__left-box background-accent center unsquishable">


            <div className = "header__events--small">
              <div className = "size2--reverse-colors">
                Hosting
              </div>
            </div>

            <MyEvent
              event = {this.props.myEvent}
              makeAgeRangeUserFriendly = {makeAgeRangeUserFriendly}
              setMapEvent = {this.setMapEvent}
            />

            <ActionButtonContainer
              myEventExists = {(!!this.props.myEvent.title)}
              setMode = {this.props.setMode}
              myEvent = {this.props.myEvent}
            />

          </div>
          {/* ^ end left box */}

          <div className = "events__right-box center--column">

            <div className = "header__events--small">
              <div className = "size2">
                Joined
              </div>
            </div>

            {
              (this.state.stateLoaded) &&
              <AttendingEventsList
                user = {this.props.user}
                leaveEvent =
                {this.state.JE.leaveEvent}
                deleteEvent = {this.deleteEvent}
                deleteAttendingEvent = {this.deleteAttendingEvent}
                makeAgeRangeUserFriendly = {makeAgeRangeUserFriendly}

                setMapEvent = {this.setMapEvent}
              />
            }

          </div>
          {/* ^ end right box */}

        </div>
        {/* ^ end events-box */}

        {
          (this.props.mode) &&
          <ManageEventModal
            mode = {this.props.mode}
            close = {this.props.setMode.bind(this, undefined)}
          />
        }

        {(this.state.mapEvent !== null) &&
          <ShowPositionOnMapModal
            event = {this.state.mapEvent}
            close = {this.setMapEvent.bind(this, null)}
          />
        }

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

  user: reduxState.userReducer.user,

  myEvent: reduxState.myEventReducer.myEvent,
});
const mapDispatchToProps = {
  setMode,
  setEvents,
  setMyEvent,
  setUser,
  setUserSubmitError,
  setUserSubmitSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
