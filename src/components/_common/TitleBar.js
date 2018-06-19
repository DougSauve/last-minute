import React from 'react';
import './TitleBar.scss';

import BackToIndex from './BackToIndex';
import Login from './Login';
import Logout from './Logout';

const TitleBar = (props) => (
  // props: {
  //   showBackToIndex (boolean)
  //   title (string)
  //   titleClass (string)
  //   showLogin (boolean)
  //   logIn (function)
  //   showLogout (boolean)
  // }


  <div className = "TitleBar">
    {(props.showBackToIndex) && <BackToIndex />}
    <div className = {props.titleClass}>
      {props.title}
    </div>
    <div className = "TitleBar__spacer" />
    {(props.showLogout) && <Logout />}
    {(props.showLogin) && <Login logIn = {props.logIn} />}
  </div>
);

export { TitleBar as default };
