import React, { Component } from 'react';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

const ManageEventSubmitButton = (props) => (
  // props: {
  //   action(function): action to take when button is clicked
  //   value (String): what to write on the button
  // }
  <div
    className = "manage-event-modal__submit-button"
    onClick = {() => {props.action}}
  >
    {capitalizeFirstLetter(props.value)}
  </div>
);

export { ManageEventSubmitButton as default };
