import React from 'react';

const BackToDash = () => (
  <div
    className = "back-to-dash-link"
    onClick = {() => window.location.pathname = '/index'}
  >
      Back
  </div>
);

export { BackToDash as default };
