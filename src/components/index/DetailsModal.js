import React from 'react';
import './DetailsModal.scss';

import DetailsMap from './DetailsMap';

const DetailsModal = (props) => (
  // props: {
  // event = {this.state.detailsEvent}
  // getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}
  // joinEvent = {this.joinEvent}
  // userHasJoinedEvent = {this.userHasJoinedEvent}
  // user = {this.props.user}
  // cancelJoinEvent = {this.cancelJoinEvent}
  // deleteEvent = {this.deleteEvent}
  // closeModal = {this.closeModal}
  //
  // setShowOnMap = {this.setShowOnMap}
  // showOnMap = {this.state.showOnMap}
  // showNoInternetAlert = {this.showNoInternetAlert}
  // }

  <div className = "details-modal">

    <div className = "event-container">

      <div className = "title">{props.event.title}</div>
      <div className = "distance">5.8 miles away</div>

      <div className = "property">
        <div className = "key">Host:</div>
        {(props.event.createdBy._id === props.user._id) ?
          <div className = "value">You</div> :
          <div className = "value">
            {props.event.createdBy.name}
            <div className = "secondary-text">{props.event.createdBy.gender},
              age {props.event.createdBy.ageRange}
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
                (props.showOnMap) ? props.setShowOnMap(false) : props.setShowOnMap(true);
              }else{
                props.showNoInternetAlert();
              }
            }}
          >
            {props.showOnMap ? <span>Hide map</span> : <span>Show map</span>}
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
        <div className = "value">{props.event.minimumPeople}-{props.event.maximumPeople} (currently {props.event.attendees.length})</div>
      </div>

      {(props.event.notes) &&
        <div className = "property">
          <div className = "key">Notes:</div>
          <div className = "value">{props.event.notes}</div>
        </div>
      }

    </div>


    {/* show 'remove event' instead of join/unjoin if it's their own event */}
    {
      (props.event.createdBy._id === props.user._id) ?
      <div className = "button background-red"
        onClick = {props.deleteEvent}
      >
        Remove this event
      </div> :
      <div>
        {/* show join or cancel join based on whether they're signed up or not */}
        {
          (props.userHasJoinedEvent()) ?
          <div className = "button background-red"
            onClick = {props.cancelJoinEvent}
          >
            Leave event
          </div> :
          <div className = "button background-blue"
            onClick = {props.joinEvent}
          >
            Join
          </div>
        }
      </div>
    }


    <div className = "button background-none"
      onClick = {props.closeModal}
    >
      Close
    </div>

    {(props.showOnMap) &&
      <DetailsMap
        event = {props.event}
      />
    }


  </div>
);


export default DetailsModal;
