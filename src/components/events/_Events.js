import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setMode, setEvents, addEvent } from '../../redux/events';
import { setMyEvent } from '../../redux/myEvent';
import { setUser, setUserSubmitError, setUserSubmitSuccess } from '../../redux/user';

import TitleBar from '../_common/TitleBar';
import Footer from '../_common/Footer';

import MyEvent from './MyEvent';
import ActionButtonContainer from './ActionButtonContainer';
import ManageEventModal from './manageEventModal/_ManageEventModal';
import AttendingEventsList from './AttendingEventsList';

// this page displays all of a user's own events in OwnEventsList. It also provides buttons to create, edit, and delete their own events.
// Event looks like:
// Title / Content - Desktop only / Location / #min #now #max / Creator

class Events extends React.Component {

  state = {
    showMyEventsList: false,
  };

  componentWillMount() {
    this.props.socket.emit('getCurrentUser', async (user) => {
      if (!user) return window.location.pathname = '/';
      await this.props.setUser(user);

      //get myEvent and user from db variable and set them to redux state
      this.props.socket.emit('getMyEvent', (event) => {
        if (event) {
          this.props.setMyEvent(event);
        } else {
          this.props.socket.emit('readUser', user._id, async (err, userForHostedEvent) => {
            await (() => {
              if (err) {
                console.log(err);
              } else {
                if (userForHostedEvent.hostedEvents[0]) {
                  this.props.setMyEvent(userForHostedEvent.hostedEvents[0]);
                  this.props.setUser(userForHostedEvent);
                }
              };
            })();

            console.log('all done loading');
            this.setState(() => ({ showMyEventsList: true }));

          })
        }
      });
    });
  };

  cancelJoin = (event) => {
    this.props.socket.emit('removeEventFromUser', {user: this.props.user, event}, async (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('removeUserFromEvent', {user: this.props.user, event}, async (err2, res2) => {
          if (err2) {
            this.props.setUserSubmitError(err2);
          } else {
            await this.props.setUser(res);
            await this.props.socket.emit('readAllEvents', (err, res) => {
              if (err) {
                console.log(err);
              } else {
                this.props.setEvents(res);
              }
            });
            console.log('You have unjoined this event. Result:', res2);
          }
        });
      }
    });
  }

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

        {
          (this.props.mode) &&
          <ManageEventModal
            mode = {this.props.mode}
          />
        }

        {
          (this.state.showMyEventsList) &&
          <AttendingEventsList
          events = {this.props.user.attendingEvents}
          cancelJoin = {this.cancelJoin}
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
  setUserSubmitSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
