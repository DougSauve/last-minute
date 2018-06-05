import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const DetailsModal = (props) => (
  // props: {
  //   event = {this.state.detailsEvent}
  //   closeModal = {this.closeModal}
  //   getUserFriendlyMaxMinPeople = {this.getUserFriendlyMaxMinPeople}
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
        Cancel Join
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

    <Map
      google = {props.google}
      initialCenter = {props.event.location}
      zoom = {15}
      style = {{position: 'fixed', top: '500px', width: '50%', height: '50%'}}
      >
      <Marker position = {props.event.location} />
    </Map>


  </div>
);


export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(DetailsModal);
