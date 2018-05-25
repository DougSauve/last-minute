import React from 'react';

const MyEvent = (props) => (
  <div className = "event__own-event">
    <div className = "event__own-event__message">{(props.event.title) ?
      <span>Your event:</span> :
      <span>What do you feel like doing? Create an event and see who joins!</span>}
    </div>

    <div className = "event__own-event__title">
      {(props.event.title) && <span>{props.event.title}</span>}
    </div>

    <div className = "event__own-event__place">
      {(props.event.place) && <span>Place: {props.event.place}</span>}
    </div>

    <div className = "event__own-event__expiresAt">
      {(props.event.expiresAt) &&
        <span>Time: {props.event.expiresAtHour}:{props.event.expiresAtMinute} {props.event.expiresAtAM}</span>}
    </div>

    <div className = "event__own-event__number-of-people">
      {(props.event.minimumPeople) && <span>Number of people: {props.event.minimumPeople}
        {props.event.maximumPeople === Infinity ? '+' : '-' + props.event.maximumPeople}</span>}
    </div>

    <div className = "event__own-event__notes">
      {(props.event.notes) && <span>Notes: {props.event.notes}</span>}
    </div>

  </div>
);

export { MyEvent as default };
