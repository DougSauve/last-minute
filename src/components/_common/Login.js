import React from 'react';

const Login = (props) => (
  // props: {
  //   logIn = {props.logIn}
  // }
  <div
    className = "login"
    onClick = {props.logIn}
  >
      Log in
  </div>
);

export { Login as default };
