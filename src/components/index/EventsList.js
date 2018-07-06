import React from 'react';
import {calculateDistance} from '../../../utils/calculateDistance';

class EventsList extends React.Component {
  // props: {
  //   events = {this.props.events}
  //   showDetailsModal = {this.showDetailsModal}
  //   user
  // }
  eventsInRange = false;

  componentDidUpdate() {
    this.eventsInRange = false;
  };

  render() {
    return (
      <div className = 'list events-list width50_percent'>

        {
          this.props.events.map((event, index) => {

            let distanceToEvent =
            calculateDistance(
              this.props.user.currentHomeLocation.location.lat,
              this.props.user.currentHomeLocation.location.lng,
              event.location.lat,
              event.location.lng,
              this.props.user.searchPreferences.units
            );

            if (distanceToEvent <= this.props.user.searchPreferences.distance) {
              this.eventsInRange = true;

              return <div
                key = {event.createdAt}
                className = "list-item-container event-spacing">

                <div className = "title">{event.title}</div>
                <div className = "distance">
                  <span>{distanceToEvent} {this.props.user.searchPreferences.units} away</span>
                </div>

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
            };
          })
        }

        {(this.eventsInRange === false) &&
          <div className = "message">
            There are no events to display.
          </div>
        }

      </div>
    );
  };
};

export default EventsList;
