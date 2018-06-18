import React from 'react';

const AttendingEventsList = (props) => (
  // props: {
  //   events = {this.props.user.attendingEvents}
  //   cancelJoinEvent = {this.cancelJoinEvent}
  //   user = {this.props.user
  // }

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
            <div>Hosted by: {(event.createdBy._id === props.user._id) ?
              <span>You</span> :
              <span>{event.createdBy.name} {event.createdBy.gender} {event.createdBy.ageRange}</span>
            }
            </div>

            <div>When: {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}</div>
            {
              (event.createdBy._id === props.user._id) ?
              <div className = "events__attending-events-list__cancel-join-button"
                onClick = {props.deleteEvent.bind(this, event)}
              >
                Remove your event
              </div> :
              <div className = "events__attending-events-list__cancel-join-button"
                onClick = {props.cancelJoinEvent.bind(this, event)}
              >
                I can't attend anymore
              </div>
            }
          </div>
        )
      }) :
      <span>You aren't planning to attend any events.</span>
    }
  </div>

);


export default AttendingEventsList;
