import React from 'react';
import './MyEvent.scss';

import AttendeeList from '../_common/AttendeeList';

const MyEvent = (props) => (
  <div className = "up-point6 list--color-reverse width100_percent unsquishable">
    <div className = "message">{(!props.event.title) &&
      <span>What do you feel like doing? Create an event and see who joins!</span>}
    </div>

    {(props.event.title) &&
      <div className = "list-item-container event-spacing unsquishable">

        <div className = "title">{props.event.title}</div>

        <div className = "property">
          <div className = "key">Meet at:</div>
          <div className = "value property">
            <div>{props.event.place}
              <div className = "secondary-text">{props.event.address}</div>
            </div>

            <div className = "link color-accent rem-before unsquishable"
              onClick = {() => {
                //check for internet access
                if (window.navigator.onLine) {
                  props.setMapEvent(props.event);
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
            {props.event.expiresAtHour}:{props.event.expiresAtMinute} {props.event.expiresAtAM}
          </div>
        </div>

        <div className = "property">
          <div className = "key">People:</div>
          <div className = "value">
            <div>
              {props.event.minimumPeople}-{props.event.maximumPeople} (currently {props.event.attendees.length})
            </div>

            <AttendeeList
              event = {props.event}
              showNames = {true}
            />

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
