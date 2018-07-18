import React from 'react';
import './TitleBar.scss';

import Logout from './Logout';

const TitleBar = (props) => (
  // props: {
  //   links (component)
  //   showLogout (boolean)
  //   fixed (booleam)
  //   deviceType (string - 'desktop' or 'mobile')
  // }


  <div className = {(props.fixed || props.deviceType === 'mobile') ? "TitleBar--fixed" : "TitleBar"}>
    {(props.showBackToIndex) && <BackToIndex />}

    {(props.links) && (props.links.includes('events') &&
      <div
        className = "bar-link"
        onClick = {() => window.location.pathname = '/events'}
      >
        My Events
      </div>
    )}
    {(props.links) && (props.links.includes('profile') &&
      <div
        className = "bar-link"
        onClick = {() => window.location.pathname = '/profile'}
      >
        My Profile
      </div>
    )}
    {(props.links) && (props.links.includes('index') &&
      <div
        className = "bar-link"
        onClick = {() => window.location.pathname = '/index'}
      >
        {'< Back to Open Events'}
      </div>
    )}

    <div className = "TitleBar__spacer" />

    {(props.showLogout) && <Logout />}
  </div>
);

export { TitleBar as default };
