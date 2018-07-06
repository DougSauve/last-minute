import React from 'react';
import {calculateDistance} from '../../../utils/calculateDistance';

import AttendeeList from '../_common/AttendeeList';

import ShowPositionOnMapModal from '../_common/maps/ShowPositionOnMapModal';
import Modal from '../_common/modal/_Modal';
import DeleteEventModal from '../_common/DeleteEventModal';

const DetailsModal = (props) => (
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
        {props.event.title}
        {(props.event.maximumPeople && props.event.attendees.length === props.event.maximumPeople) &&
          <span className = "warning">{'  (Full)'}</span>
        }
      </div>
      <div className = "distance">
        <span>
          {calculateDistance(
            props.user.currentHomeLocation.location.lat,
            props.user.currentHomeLocation.location.lng,
            props.event.location.lat,
            props.event.location.lng,
            props.user.searchPreferences.units)
          } {props.user.searchPreferences.units} away</span>
      </div>

      <div className = "property">
        <div className = "key">Host:</div>
        {(props.event.createdBy._id === props.user._id) ?
          <div className = "value">You</div> :
          <div className = "value">
            {props.event.createdBy.name}
            <div className = "secondary-text">{props.event.createdBy.gender},
              age {props.userFriendlyAgeRange}
            </div>
          </div>
        }
      </div>

      <div className = "property">
        <div className = "key">Meet at:</div>
        <div className = "value property">
          <div>{props.event.place}
            <div className = "secondary-text">{props.event.address}</div>
          </div>

          <div className = "link color-accent rem-before unsquishable"
            onClick = {() => {
              //check for internet access
              if (window.navigator.onLine) {
                props.setShowOnMap(true);
              }else{
                props.showNoInternetAlert();
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
          {props.event.expiresAtHour}:{props.event.expiresAtMinute} {props.event.expiresAtAM}
        </div>
      </div>

      <div className = "property">
        <div className = "key">People:</div>
        <div className = "value">
          <div>
            {props.event.minimumPeople}-{props.event.maximumPeople} (currently {props.event.attendees.length})
          </div>

          <AttendeeList
            event = {props.event}
            showNames = {false}
          />

        </div>
      </div>

      {(props.event.notes) &&
        <div className = "property">
          <div className = "key">Notes:</div>
          <div className = "value">{props.event.notes}</div>
        </div>
      }

      {/* show 'remove event' instead of join/unjoin if it's their own event */}
      {
        (props.event.createdBy._id === props.user._id) ?
        <div className = "button background-red width15"
          onClick = {() => {
            //check for internet access
            props.setShowDeleteModal(true);

          }}
        >
          Remove this event
        </div> :

        <div>

        {/* show join or leave based on whether they're signed up or not */}
        {
          (props.userHasJoinedEvent()) ?
          <div className = "button background-red width15"
            onClick = {props.leaveEvent}
          >
            Leave event
          </div> :
          <div>
            {/* show message instead of join if event is full */}
            {(!props.event.maximumPeople || props.event.attendees.length < props.event.maximumPeople) &&
            <div className = "button background-blue width15"
              onClick = {props.joinEvent}
            >
              Join
            </div>
            }
          </div>
        }
        </div>
      }

      <div className = "button background-none width15"
        onClick = {props.closeModal}
      >
        Close
      </div>
    </div>

    {(props.showOnMap) &&
      <ShowPositionOnMapModal
        event = {props.event}
        close = {props.setShowOnMap.bind(this, false)}
      />
    }

    {(props.showDeleteModal) &&
      <Modal
        close = {props.setShowDeleteModal.bind(this, false)}
      >
        <DeleteEventModal
          close = {props.setShowDeleteModal.bind(this, false)}
          closeModal = {props.closeModal}
        />
      </Modal>
    }

  </div>
);

export default DetailsModal;
