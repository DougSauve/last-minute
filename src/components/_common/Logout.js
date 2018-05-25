import React from 'react';

const Logout = () => (
  <div
    className = "logout"
    onClick = {() => {alert('log out')}}
  >
      Log Out
  </div>
);

export { Logout as default };
