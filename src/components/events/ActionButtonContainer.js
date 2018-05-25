import React from 'react';
import './ActionButtonContainer.scss';

// Container for action buttons
const ActionButtonContainer = (props) => (
  // props: {
  //   setMode (function)
  //   myEventExists (boolean)
  // }

  <div className = "event__action-button-container">

    {/* Create Button */}
    {(!props.myEventExists) &&
      <div
        className = "event__create-button"
        onClick = {() => {props.setMode("create")}}
      >
        Make an event
      </div>
    }


    {/* Update Button */}
    {(props.myEventExists) &&
      <div
        className = "event__update-button"
        onClick = {() => {props.setMode("update")}}
        >
          Edit your event
        </div>
    }

    {/* Delete Button */}
    {(props.myEventExists) &&
      <div
        className = "event__delete-button"
        onClick = {() => {props.setMode("delete")}}
        >
          Remove your event
        </div>
    }

  </div>
);

export { ActionButtonContainer as default };
