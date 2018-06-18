import React from 'react';

import DetailsMap from './DetailsMap';

const DetailsModal = (props) => (
  // props: {
  //   event = {this.state.detailsEvent}
  // getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}
  // joinEvent = {this.joinEvent}
  // userHasJoinedEvent = {this.userHasJoinedEvent}
  // cancelJoinEvent = {this.cancelJoinEvent}
  // closeModal = {this.closeModal}
  //
  // setShowOnMap = {this.setShowOnMap}
  // showOnMap = {this.state.showOnMap}
  // showNoInternetAlert = {this.showNoInternetAlert}
  // }

  <div className = "index__details-modal">
    <div>What's happening: {props.event.title}</div>
    <div>When: {props.event.expiresAtHour}:{props.event.expiresAtMinute} {props.event.expiresAtAM}</div>
    <div>
      How many people: {props.getUserFriendlyMaxMinPeople(props.event.minimumPeople, props.event.maximumPeople)}
    </div>
    <div>Who's going: </div>
    <div>Where: {props.event.place}</div>
    <div>Notes: {props.event.notes}</div>

    {/* show join or cancel join based on whether they're signed up or not */}
    {
      (props.userHasJoinedEvent()) ?
      <div className = "profile__change-email-modal__submit-button"
        onClick = {props.cancelJoinEvent}
      >
        Leave event
      </div> :
      <div className = "profile__change-email-modal__submit-button"
        onClick = {props.joinEvent}
      >
        Join
      </div>
    }

      <div className = "profile__change-email-modal__cancel-button"
        onClick = {props.closeModal}
      >
        Close
      </div>

      <div className = "profile__change-email-modal__show-on-map-button"
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

      {(props.showOnMap) &&
        <DetailsMap
          event = {props.event}
        />
      }


  </div>
);


export default DetailsModal;
