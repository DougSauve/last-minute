import React from 'react';
import './MyEvent.scss';

const MyEvent = (props) => (
  <div className = "event__myEvent list--color-reverse width100_percent">
    <div className = "message">{(!props.event.title) &&
      <span>What do you feel like doing? Create an event and see who joins!</span>}
    </div>

    {(props.event.title) &&
      <div className = "list-item-container event-spacing">

        <div className = "title">{props.event.title}</div>

        <div className = "property">
          <div className = "key">Meet at:</div>
          <div className = "value property">
            <div>{props.event.place}
              <div className = "secondary-text">{props.event.address}</div>
            </div>

            <div className = "link color-accent rem-before unsquishable"
              // onClick = {() => {
              //   //check for internet access
              //   if (window.navigator.onLine) {
              //     (props.showOnMap) ? props.setShowOnMap(false) : props.setShowOnMap(true);
              //   }else{
              //     props.showNoInternetAlert();
              //   }
              // }}
            >
              map link
              {/* {props.showOnMap ? <span>Hide map</span> : <span>Show map</span>} */}
            </div>

          </div>
        </div>

        <div className = "property">
          <div className = "key">When:</div>
          <div className = "value">
            {props.event.expiresAtHour}:{props.event.expiresAtMinute} {props.event.expiresAtAM}
          </div>
        </div>

        <div className = "property">
          <div className = "key">People:</div>
          <div className = "value">
            <div>
              {props.event.minimumPeople}-{props.event.maximumPeople} (currently {props.event.attendees.length})
            </div>
            <div className = "center">
              {
                props.event.attendees.map((attendee, index)=> {
                  return (
                    <span
                      key = {index}
                      className = "secondary-text"
                    >
                      {attendee.name}, {attendee.gender}, {props.makeAgeRangeUserFriendly(attendee.ageRange)} {'  '}
                    </span>
                  )
                })
              }
            </div>
          </div>
        </div>

        {(props.event.notes) &&
          <div className = "property">
            <div className = "key">Notes:</div>
            <div className = "value">{props.event.notes}</div>
          </div>
        }

      </div>
    }
  </div>
);

export { MyEvent as default };
