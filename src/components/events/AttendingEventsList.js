import React from 'react';

import ShowPositionOnMapModal from '../_common/maps/ShowPositionOnMapModal';

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
        return <div
          key = {index}
          className = "list-item-container event-spacing">

          <div className = "title">{event.title}</div>
          <div className = "distance">5.8 miles away</div>

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
                    props.setShowOnMap(true);
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
              {event.expiresAtHour}:{event.expiresAtMinute} {event.expiresAtAM}
            </div>
          </div>

          <div className = "property">
            <div className = "key">People:</div>
            <div className = "value">
              <div>
                {event.minimumPeople}-{event.maximumPeople} (currently {event.attendees.length})
              </div>
              <div className = "center">
                {
                  event.attendees.map((attendee, index)=> {
                    return (
                      <span
                        key = {index}
                        className = "secondary-text"
                      >
                        {attendee.gender}, {props.makeAgeRangeUserFriendly(attendee.ageRange)} {'  '}
                      </span>
                    )
                  })
                }
              </div>
            </div>
          </div>

          {(event.notes) &&
            <div className = "property">
              <div className = "key">Notes:</div>
              <div className = "value">{event.notes}</div>
            </div>
          }

          {/* leave event button */}
          <div className = "property center">
            <div
              className = "button background-none width15"
              onClick = {props.leaveEvent.bind(this, props.user, event, () => {console.log('hi mom')} )}
            >
              Leave this event
            </div>
          </div>

          {(props.showOnMap) &&
            <ShowPositionOnMapModal
              event = {event}
              close = {props.setShowOnMap.bind(this, false)}
            />
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
