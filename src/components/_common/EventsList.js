import React from 'react';

import './EventsList.scss';

import { connect } from 'react-redux';
import { setEvents } from '../../redux/index';

class EventsList extends React.Component {
  // props: {
  //   eventsListClass (string): contains class name
  //   limited (boolean): whether to show details
  // }
  componentDidMount() {
    this.getAllEventsFromDB();
  };

  getAllEventsFromDB = () => {
    //populate store events from DB
    this.props.socket.emit('readAllEvents', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.props.setEvents(res);
      }
    });
  };

  render() {
    return (
      <div className = {this.props.firstWordOfClass + '__events-list'}>
        {
          (this.props.events[0]) ?
          this.props.events.map((event) => {
            return <div
              key = {event.createdAt}
              className = "index__events-list__event">

              <div className = "index__events-list__event__title">
                {(event.title) && <span>{event.title}</span>}
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

const mapStateToProps = (reduxStore) => ({
  //myEvent: reduxStore.myEventReducer.myEvent,
  events: reduxStore.indexReducer.events,
  socket: reduxStore.socketReducer.socket,
});
const mapDispatchToProps = {
  setEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
