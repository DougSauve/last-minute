import React from 'react';
import './_Index.scss';

import { connect } from 'react-redux';
import { setEvents } from '../../redux/events';
import { setMyEvent, setSubmitError, setSubmitSuccess } from '../../redux/myEvent';
import { setUser } from '../../redux/user';
import { setDistanceError, clearDistanceError } from '../../redux/search';

import { loadState, getAllEventsFromDB } from '../_common/loadState';
import cleanEventsList from '../_common/cleanEventsList';
import checkMyEventForExpiry from '../_common/checkMyEventForExpiry';

import TitleBar from '../_common/TitleBar';
import EventsList from './EventsList';
import DetailsModal from './DetailsModal';
import OrientationModal from './OrientationModal';
import DistanceFilter from './DistanceFilter';
import ShowPositionOnMapModal from '../_common/maps/ShowPositionOnMapModal';

import Modal from '../_common/modal/_Modal';
import EditHomeLocation from '../_common/EditHomeLocation';
import Footer from '../_common/Footer';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';
import makeAgeRangeUserFriendly from '../../../utils/makeAgeRangeUserFriendly';
import getDeviceType from '../../../utils/getDeviceType';
import joiningEvents from '../_common/joiningEvents';

class Index extends React.Component {

  state = {
    showDetailsModal: false,
    showOnMap: false,
    showDeleteModal: false,
    showOrientationModal: false,
    detailsEvent: undefined,
    stateLoaded: false,
    showOptions: false,
    JE: new joiningEvents(this.props.socket, this.props.setEvents, this.props.setUser, this.props.setUserSubmitError),
    deviceType: getDeviceType(),
  };

  componentWillMount() {

    //check for current user, kick out if not logged in
    this.props.socket.emit('getCurrentUser', (userFromSession) => {
      if (!userFromSession) window.location.pathname = '/';
    });
    //load redux from current state
    loadState(this.props.socket, this.props.setUser, this.props.setMyEvent, this.props.setEvents,)
    .then(() => {
      this.setState(() => ({ stateLoaded: true }));

      //background work:

      //event cleanup
      if (this.props.events.length !== 0) cleanEventsList(this.props.socket).then((eventRemoved) => {
        eventRemoved && getAllEventsFromDB();
      });

      // check if a user's hosted event has expired. If it has, move it to their attendingEvents list, where it can be history.
      if (this.props.myEvent._id) {
        checkMyEventForExpiry(this.props.socket, this.props.user, this.props.setUser, this.props.setMyEvent);
      };
    });

    this.props.socket.emit('checkFirstTimeUser', (res) => {
      if (res === true) this.setState(() => ({ showOrientationModal: true }));
    });
  };

  showDetailsModal = async (event) => {
    await this.setState(() => ({ detailsEvent: event, showDetailsModal: true }));
  };
  setShowOnMap = (value) => {
    this.setState(() => ({ showOnMap: value }));
  };
  setShowDeleteModal = (value) => {
    this.setState(() => ({ showDeleteModal: value }));
  };
  setShowOptions = (value) => {
    this.setState(() => ({ showOptions: value }));
  };
  areModalsOpen = () => {
    return (this.state.showDetailsModal || this.state.showOrientationModal);
  };
  switchHomeLocation = (homeLocation) => {
    this.props.socket.emit('setCurrentHomeLocation', {user: this.props.user, homeLocation }, (err, res) => {
      if (!err) {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
        });
      };
    });
  };

  setSearchPreferences = () => {
    const form = document.getElementsByClassName('searchPreferences')[0];
    const distance = form.elements.distance.value;
    const units = form.elements.units.value;

    if (this.checkSearchPreferencesForErrors(distance, units)) return;

    //set them in the DB
    this.props.socket.emit('setSearchPreferences', {user: this.props.user, distance, units}, (err, res) => {
      if (!err) {
        this.props.socket.emit('setCurrentUser', res,  () => {
          this.props.setUser(res);
        });
      };
    });
  };
  checkSearchPreferencesForErrors = (distance, units) => {
    this.props.clearDistanceError();
    let errorsPresent = false;

    if (!distance || distance - 1 !== distance - 1 || distance < 0) {
      errorsPresent = true;
      this.props.setDistanceError('Please enter a valid number.');
    };

    return errorsPresent;
  };


  getUserFriendlyMaxMinPeople = (min, max) => {
    if (!max) return min + '+';
    else return min + ' - ' + max;
  };

  userHasJoinedEvent = () => {
    let joinedEvent = false;

    this.state.detailsEvent.attendees.forEach((attendee) => {
      if (attendee._id === this.props.user._id) joinedEvent = true;
    });

    return joinedEvent;
  }
  deleteEvent = () => {
    this.props.socket.emit ('deleteEvent', this.state.detailsEvent._id, (err, res) => {
      if (err) {
        this.props.setSubmitError({ submitError: err });
      } else {
        const eventBeingDeleted = res;
        //remove event from user's attendingEvents...
        this.props.socket.emit('deleteAttendingEventFromUser', {user: this.props.user, event: eventBeingDeleted}, (err2, res2) => {
          if (!err2) {
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

                //reload the events list
                getAllEventsFromDB(this.props.socket, this.props.setEvents);

                //close the modal
                this.closeModal();
                this.props.setSubmitSuccess({ submitSuccess: `${eventBeingDeleted.title} has been removed.` });
              };
            });
          };
        });
      }
    });
  };

  closeModal = () => {
    const stateToChange = this.state;

    for (let item in stateToChange) {
        if (item !== 'stateLoaded' && item !== 'JE' && item !== 'deviceType' && item !== 'showOptions') stateToChange[item] = false;
    };

    this.setState(() => ({ ...stateToChange }));
  };
  
  render() {
    return(
      <div className = "index">

        <TitleBar
          links = {['events', 'profile']}
          showLogout = {true}
          deviceType = {this.state.deviceType}
        />

        <div className = "top-2rem success">{this.props.submitSuccess}</div>

        <div className = {this.state.deviceType === 'mobile' ? "header--fixed" : "header"}>
          <div className = "size3">
            Open Events
          </div>
        </div>

        <div className = {this.state.deviceType === 'mobile' ? "index-body scrollable" : "index-body"}>
          {/* options: */}
          <div
            className = "index__toggle-options-pl"
            onClick = {this.state.showOptions ?
              () => {
                this.setShowOptions(false);
                document.getElementsByClassName('index__toggle-options-pl')[0].style.borderRadius = ".6rem";
              } :
              () => {
                this.setShowOptions(true);
                document.getElementsByClassName('index__toggle-options-pl')[0].style.borderRadius = ".6rem .6rem 0 0";
              }}
          >
            Change Settings
            <span>{' '}{this.state.showOptions ? '-' : '+'}</span>
          </div>
          {/* this needs to be hidden unless options is clicked - it toggles this. */}
          {(this.state.showOptions || this.state.deviceType === 'desktop') &&
            <div className = "options--index">
              {(this.state.stateLoaded) &&
                <DistanceFilter
                  setSearchPreferences = {this.setSearchPreferences}
                  distance = {this.props.user.searchPreferences.distance}
                  distanceError = {this.props.distanceError}
                  units = {this.props.user.searchPreferences.units}
                  areModalsOpen = {this.areModalsOpen}
                  deviceType = {this.state.deviceType}
                />
              }

              {(this.state.stateLoaded) &&
                <EditHomeLocation
                  currentHomeLocation = {this.props.user.currentHomeLocation}
                  homeLocations = {this.props.user.homeLocations}
                  switchHomeLocation = {this.switchHomeLocation}
                  complete = {false} //use complete EditHomeLocation vs partial-featured
                  deviceType = {this.state.deviceType}
                />
              }
            </div>
          }

          {(this.state.stateLoaded) &&
            <EventsList
              user = {this.props.user}
              events = {this.props.events}
              deviceType = {this.state.deviceType}
              showDetailsModal = {this.showDetailsModal}
              setShowOptions = {this.setShowOptions}
            />
          }

          {(this.state.showDetailsModal) &&
            <Modal
              close = {this.closeModal}
              deviceType = {this.state.deviceType}
              classNames = "scrollable"
            >
              <DetailsModal
                user = {this.props.user}
                event = {this.state.detailsEvent}

                showOnMap = {this.state.showOnMap}
                setShowOnMap = {this.setShowOnMap}
                showDeleteModal = {this.state.showDeleteModal}
                setShowDeleteModal = {this.setShowDeleteModal}
                showDetailsModal = {this.state.showDetailsModal}

                deviceType = {this.state.deviceType}

                userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.state.detailsEvent.createdBy.ageRange)}
                makeAgeRangeUserFriendly = {makeAgeRangeUserFriendly}
                getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}

                joinEvent =
                {this.state.JE.joinEvent.bind(this, this.props.user, this.state.detailsEvent, this.closeModal)}
                userHasJoinedEvent = {this.userHasJoinedEvent}
                leaveEvent =
                {this.state.JE.leaveEvent.bind(this, this.props.user, this.state.detailsEvent, this.closeModal)}
                deleteEvent = {this.deleteEvent}

                closeModal = {this.closeModal}
              />
            </Modal>
          }

          {(this.state.showOrientationModal) &&
            <Modal>
              <OrientationModal
                closeModal = {
                  () => {
                    this.closeModal();
                    this.props.socket.emit('unsetFirstTimeUser');
                  }
                }
                showOrientationModal = {this.state.showOrientationModal}
              />
            </Modal>
          }

          {(this.state.showOnMap) &&
            <ShowPositionOnMapModal
              event = {this.state.detailsEvent}
              close = {this.setShowOnMap.bind(this, false)}
            />
          }

          <Footer />
        </div>

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

  distanceError: reduxStore.searchReducer.distanceError,
});
const mapDispatchToProps = {
  setEvents,
  setMyEvent,
  setUser,
  setSubmitError,
  setSubmitSuccess,

  setDistanceError,
  clearDistanceError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
