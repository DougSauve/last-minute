import React from 'react';
import './EventsList.scss';

class EventsList extends React.Component {
  // props: {
  //   events = {this.props.events}
  //   showDetailsModal = {this.showDetailsModal}
  //   user
  // }
  render() {
    return (
      <div className = 'index__events-list'>
        <div className = "index__title">
          <div>
            Open Events
          </div>
        </div>

        {
          (this.props.events[0]) ?
          this.props.events.map((event, index) => {
            return <div
              key = {event.createdAt}
              className = "index__list-event event-container">

              <div className = "title">{event.title}</div>
              <div className = "distance">5.8 miles away</div>

              <div className = "property">
                <div className = "key">Host:</div>
                {(event.createdBy._id === this.props.user._id) ?
                <div className = "value">You</div> :
                <div className = "value">
                  {event.createdBy.name}
                </div>
                }
              </div>

              <div className = "property">
                <div className = "key">Meet at:</div>
                <div className = "value property">
                  <div>{event.place}
                  </div>
                </div>
              </div>

              <div className = "property">
                <div className = "key">When:</div>
                <div className = "value">
                  {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}
                </div>
              </div>

              <div className = "property">
                <div className = "key">People:</div>
                <div className = "value">{event.minimumPeople}-{event.maximumPeople} (currently {event.attendees.length})</div>
              </div>

              <div
                className = "button width15 background-blue"
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
