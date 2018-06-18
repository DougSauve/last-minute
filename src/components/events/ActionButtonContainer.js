import React from 'react';
import './ActionButtonContainer.scss';

// Container for action buttons
const ActionButtonContainer = (props) => (
  // props: {
  //   setMode (function)
  //   myEventExists (boolean)
  //   showNoInternetAlert (function)
  // }

  <div className = "event__action-button-container">

    {/* Create Button */}
    {(!props.myEventExists) &&
      <div
        className = "event__create-button"
        onClick = {() => {
          //check for internet connection
          if (window.navigator.onLine) {
            props.setMode("create");
          }else{
            props.showNoInternetAlert();
          }
        }}
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
