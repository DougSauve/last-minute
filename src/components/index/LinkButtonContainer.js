import React from 'react';

// Container for link buttons
const LinkButtonContainer = () => (
  <div className = "index__link-button-container">

    {/* Link to /events */}
    <div
      className = "index__to-events-button-link"
      onClick = {() => window.location.pathname = '/events'}
    >
      My Event
    </div>

    {/* Link to /profile */}
    <div
      className = "index__to-profile-button-link"
      onClick = {() => window.location.pathname = '/profile'}
    >
      My Profile
    </div>

  </div>
);

export { LinkButtonContainer as default };
