import React from 'react';
import moment from 'moment';
import {calculateDistance} from '../../../utils/calculateDistance';

import './EventsList.scss';

class EventsList extends React.Component {
  // props: {
  //   events = {this.props.events}
  //   showDetailsModal = {this.showDetailsModal}
  //   user
  //   deviceType = {this.state.deviceType}
  // }
  eventsInRange = false;

  componentDidUpdate() {
    this.eventsInRange = false;
  };

  render() {
    return (
      <div className = {this.props.deviceType ? "events-list-pl center" : "list events-list width50_percent center"}>

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
                className = "list-item-container event-spacing width100_percent">

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
                  onClick = {moment(event.expiresAt).isAfter(moment()) ?
                    this.props.showDetailsModal.bind(this, event) :
                    window.location.pathname = '/index'
                  }
                  >
                  See details
                </div>
              </div>
            };
          })
        }

        {(this.eventsInRange === false) &&
          <div className = {this.props.deviceType === 'mobile' ? "message rem-above rem-before" : "message rem-above events-list__no-events-message-d"}>
            There are no events to display. Try
            {
              this.props.deviceType === 'mobile' ?
              <span className = "link" onClick = {this.props.setShowOptions.bind(this, true)}> widening your search area </span> :
              " widening your search area "
            }
               or
            <span className = "link" onClick = {() => {window.location.pathname = '/events'}}> create your own event! </span>
          </div>
        }

      </div>
    );
  };
};

export default EventsList;
