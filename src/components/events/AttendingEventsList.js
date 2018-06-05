import React from 'react';

const AttendingEventsList = (props) => (
      <div className = "events__attending-events-list">

        {
          props.events[0] ?

          props.events.map((event) => {
            return (
              <div
                className = "events__attending-events-list__event"
                key = {event._id}
                >
                <div>Event: {event.title}</div>
                <div>Where: {event.place} ({event.address})</div>
                <div>Hosted by: {event.createdBy.name} {event.createdBy.gender} {event.createdBy.ageRange}</div>
                <div>When: {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}</div>
                <div className = "events__attending-events-list__cancel-join-button"
                  onClick = {props.cancelJoin.bind(this, event)}
                >
                  I can't attend anymore
                </div>
              </div>
            )
          }) :
          <span>You aren't planning to attend any events.</span>
        }
      </div>

    );


export default AttendingEventsList;
