import React from 'react';
import moment from 'moment';

import AttendeeList from '../_common/AttendeeList';
import {calculateDistance} from '../../../utils/calculateDistance';

const AttendingEventsList = (props) => (
  // props: {
  // user = {this.props.user}
  // leaveEvent = {JE.leaveEvent}
  // deleteEvent = {this.deleteEvent}
  // makeAgeRangeUserFriendly = {makeAgeRangeUserFriendly}
  // }
  <div className = "list events-list width100_percent">

    {
      (props.user.attendingEvents[0]) ?
      props.user.attendingEvents.map((event, index) => {
        //don't display own event
        if (JSON.stringify(props.user._id) === JSON.stringify(event.createdBy._id)) return;

        return <div
          key = {index}
          className = "list-item-container event-spacing">

          <div className = "title">{event.title}</div>
          <div className = "distance">
            <span>
              {calculateDistance(
                props.user.currentHomeLocation.location.lat,
                props.user.currentHomeLocation.location.lng,
                event.location.lat,
                event.location.lng,
                props.user.searchPreferences.units
              )
              } {props.user.searchPreferences.units} away</span>
          </div>

          <div className = "property">
            <div className = "key">Host:</div>
            {(event.createdBy._id === props.user._id) ?
              <div className = "value">You</div> :
              <div className = "value">
                {event.createdBy.name}
                <div className = "secondary-text">{event.createdBy.gender},
                  age {props.makeAgeRangeUserFriendly(event.createdBy.ageRange)}
                </div>
              </div>
            }
          </div>

          <div className = "property">
            <div className = "key">Meet at:</div>
            <div className = "value property">
              <div>{event.place}
                <div className = "secondary-text">{event.address}</div>
              </div>

              <div className = "link color-accent rem-before unsquishable"
                onClick = {() => {
                  //check for internet access
                  if (window.navigator.onLine) {
                    props.setMapEvent(event);
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
              {moment(event.expiresAt).format("MMMM Do,")} {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}
            </div>
          </div>

          <div className = "property">
            <div className = "key">People:</div>
            <div className = "value">
              <div>
                {event.minimumPeople}-{event.maximumPeople} (currently {event.attendees.length})
              </div>

              <AttendeeList
                event = {event}
                showNames = {false}
              />

            </div>
          </div>

          {(event.notes) &&
            <div className = "property">
              <div className = "key">Notes:</div>
              <div className = "value">{event.notes}</div>
            </div>
          }

          {/* leave event button */}
          {
            (event.createdBy._id === props.user._id) ?
            <div className = "property center">
              <div
                className = "button background-red width15"
                onClick = {props.deleteEvent.bind(this, event)}
              >
                Remove this event
              </div>
            </div>
            :
            <div className = "property center">
              <div
                className = "button background-none width15"
                onClick = {props.leaveEvent.bind(this, props.user, event, () => {console.log('hi mom')} )}
              >
                Leave this event
              </div>
            </div>
          }

        </div>
      }) :
      <div className = "message">
        There are no events to display.
      </div>
    }

  </div>
);


export default AttendingEventsList;
