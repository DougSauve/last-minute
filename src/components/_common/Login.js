import React from 'react';

import './Login.scss';

const Login = (props) => (
  // props: {
  //   logIn = {props.logIn}
  // }
  <div
    className = "log-in"
    onClick = {props.logIn}
  >
      Log in
  </div>
);

export { Login as default };
