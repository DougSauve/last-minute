import React from 'react';
import {calculateDistance} from '../../../utils/calculateDistance';

import AttendeeList from '../_common/AttendeeList';

import ShowPositionOnMapModal from '../_common/maps/ShowPositionOnMapModal';
import Modal from '../_common/modal/_Modal';
import DeleteEventModal from '../_common/DeleteEventModal';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class DetailsModal extends React.Component {

  componentDidMount() {
    if (this.props.showDetailsModal) {
      let enterCommand;

      if (this.props.event.createdBy._id === this.props.user._id) {
        enterCommand = this.props.setShowDeleteModal.bind(this, true);
      } else {
        if (this.props.userHasJoinedEvent()) {
          enterCommand = this.props.leaveEvent;
        } else {
          enterCommand = this.props.joinEvent;
        };
      };

      document.onkeydown = handleKeyboardEvents.bind(this, ['enter', enterCommand], ['escape', this.props.closeModal]);
    };
  };

  render() {
    return (
      // props: {
      // event = {this.state.detailsEvent}
      //
      // joinEvent = {this.joinEvent}
      // userHasJoinedEvent = {this.userHasJoinedEvent}
      // user = {this.props.user}
      // leaveEvent = {this.leaveEvent}
      // deleteEvent = {this.deleteEvent}
      // closeModal = {this.closeModal}
      // userFriendlyAgeRange = {this.userFriendlyAgeRange}
      // setShowOnMap = {this.setShowOnMap}
      // showOnMap = {this.state.showOnMap}
      // showNoInternetAlert = {this.showNoInternetAlert}
      // }

      <div className = "padding-1rem">

        <div className = "modal-item-container">

          <div className = "title">
            {this.props.event.title}
            {(this.props.event.maximumPeople && this.props.event.attendees.length === this.props.event.maximumPeople) &&
              <span className = "warning">{'  (Full)'}</span>
            }
          </div>
          <div className = "distance">
            <span>
              {calculateDistance(
                this.props.user.currentHomeLocation.location.lat,
                this.props.user.currentHomeLocation.location.lng,
                this.props.event.location.lat,
                this.props.event.location.lng,
                this.props.user.searchPreferences.units)
              } {this.props.user.searchPreferences.units} away</span>
          </div>

          <div className = "property">
            <div className = "key">Host:</div>
            {(this.props.event.createdBy._id === this.props.user._id) ?
              <div className = "value">You</div> :
              <div className = "value">
                {this.props.event.createdBy.name}
                <div className = "secondary-text">{this.props.event.createdBy.gender},
                  age {this.props.userFriendlyAgeRange}
                </div>
              </div>
            }
          </div>

          <div className = "property">
            <div className = "key">Meet at:</div>
            <div className = "value property">
              <div>{this.props.event.place}
                <div className = "secondary-text">{this.props.event.address}</div>
              </div>

              <div className = "link color-accent rem-before unsquishable"
                onClick = {() => {
                  //check for internet access
                  if (window.navigator.onLine) {
                    this.props.setShowOnMap(true);
                  }else{
                    this.props.showNoInternetAlert();
                  }
                }}
              >
                <span>Show map</span>
              </div>

            </div>
          </div>

          <div className = "property">
            <div className = "key">When:</div>
            <div className = "value">
              {this.props.event.expiresAtHour}:{this.props.event.expiresAtMinute} {this.props.event.expiresAtAM}
            </div>
          </div>

          <div className = "property">
            <div className = "key">People:</div>
            <div className = "value">
              <div>
                {this.props.event.minimumPeople}-{this.props.event.maximumPeople} (currently {this.props.event.attendees.length})
              </div>

              <AttendeeList
                event = {this.props.event}
                showNames = {false}
              />

            </div>
          </div>

          {(this.props.event.notes) &&
            <div className = "property">
              <div className = "key">Notes:</div>
              <div className = "value">{this.props.event.notes}</div>
            </div>
          }

          {/* show 'remove event' instead of join/unjoin if it's their own event */}
          {
            (this.props.event.createdBy._id === this.props.user._id) ?
            <div className = "button background-red width15"
              onClick = {() => {
                //check for internet access
                this.props.setShowDeleteModal(true);

              }}
            >
              Remove this event
            </div> :

            <div>

            {/* show join or leave based on whether they're signed up or not */}
            {
              (this.props.userHasJoinedEvent()) ?
              <div className = "button background-red width15"
                onClick = {this.props.leaveEvent}
              >
                Leave event
              </div> :
              <div>
                {/* show message instead of join if event is full */}
                {(!this.props.event.maximumPeople || this.props.event.attendees.length < this.props.event.maximumPeople) &&
                <div className = "button background-blue width15"
                  onClick = {this.props.joinEvent}
                >
                  Join
                </div>
                }
              </div>
            }
            </div>
          }

          <div className = "button background-none width15"
            onClick = {this.props.closeModal}
          >
            Close
          </div>
        </div>

        {(this.props.showOnMap) &&
          <ShowPositionOnMapModal
            event = {this.props.event}
            close = {this.props.setShowOnMap.bind(this, false)}
          />
        }

        {(this.props.showDeleteModal) &&
          <Modal
            close = {this.props.setShowDeleteModal.bind(this, false)}
          >
            <DeleteEventModal
              close = {this.props.setShowDeleteModal.bind(this, false)}
              closeModal = {this.props.closeModal}
            />
          </Modal>
        }

      </div>
    );
  };
};

export default DetailsModal;
