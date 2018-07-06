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
    });
  };

  componentDidMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['escape', this.closeModal]);
    this.setStyling();
    window.addEventListener('resize', this.setStyling()); //not working
  };

  componentDidUpdate() {
    console.log('styling');
    this.setStyling();
  }

  setStyling = () => {
    document.getElementsByClassName('events__left-box__background__container')[0]
    .style.minHeight = `${window.innerHeight - 144}px`;
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to make a new event!');
  };

  setMapEvent = async (event) => {
    await this.setState(() => ({ mapEvent: event }));
  };

  deleteEvent = (event) => {
    this.props.socket.emit ('deleteEvent', event._id, (err, res) => {
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
              showNoInternetAlert = {this.showNoInternetAlert}
            />

          </div>
          {/* ^ end left box */}

          <div className = "events__right-box">

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
