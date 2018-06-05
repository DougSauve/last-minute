import React from 'react';
import './EventsList.scss';

class EventsList extends React.Component {
  // props: {
  //   events = {this.props.events}
  //   showDetailsModal = {this.showDetailsModal}
  // }
  render() {
    return (
      <div className = 'index__events-list'>
        {
          (this.props.events[0]) ?
          this.props.events.map((event, index) => {
            return <div
              key = {event.createdAt}
              className = "index__events-list__event">

              <div className = "index__events-list__event__title">
                <span>Event: {(event.title) && <span>{event.title}</span>}</span>
              </div>

              <div className = "index__events-list__event__createdBy">
                <span>Hosted by: {(event.createdBy) && <span>{event.createdBy.name}</span>}</span>
              </div>

              <div className = "index__events-list__event__place">
                {(event.place && (!this.props.limited)) && <span>Where: {event.place}</span>}
              </div>

              <div className = "index__events-list__event__expiresAt">
                {(event.expiresAt) &&
                  <span>When: {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}</span>}
              </div>

              <div className = "index__events-list__event__number-of-people">
                {(event.minimumPeople) && <span>How many people: {event.minimumPeople}
                  {event.maximumPeople === null ? '+' : '-' + event.maximumPeople}</span>}
              </div>

              <div className = "index__events-list__event__notes">
                {(event.notes && (!this.props.limited)) && <span>Notes: {event.notes}</span>}
              </div>
              <div
                className = "index__events-list__event__details-button"
                onClick = {this.props.showDetailsModal.bind(this, event)}
                >
                See details
              </div>

            </div>
          }) :
          <div className = "index__no-events-message">
            There are no events to display.
          </div>
        }
      </div>
    );
  };
};

export default EventsList;
