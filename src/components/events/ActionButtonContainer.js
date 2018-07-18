import React from 'react';
import moment from 'moment';
import './ActionButtonContainer.scss';

// Container for action buttons
const ActionButtonContainer = (props) => (
  // props: {
  //   setMode (function)
  //   myEventExists (boolean)
  // }

  <div className = "button-container unsquishable">

    {/* Create Button */}
    {(!props.myEventExists) &&
      <div
        className = "button background-green width15"
        onClick = {() => {props.setMode("create")}}
      >
        Make an event
      </div>
    }


    {/* Update Button */}
    {(props.myEventExists) &&
      <div
        className = "button background-blue width15"
        onClick = {() => {
          moment(props.myEvent.expiresAt).isAfter(moment()) ?
          props.setMode("update") :
          window.location.pathname = '/events'
        }}
      >
        Edit your event
      </div>
    }

    {/* Delete Button */}
    {(props.myEventExists) &&
      <div
        className = "button background-red width15"
        onClick = {() => {
          moment(props.myEvent.expiresAt).isAfter(moment()) ?
          props.setMode("delete") :
          window.location.pathname = '/events'
        }}
      >
        Remove your event
      </div>
    }

  </div>
);

export { ActionButtonContainer as default };
