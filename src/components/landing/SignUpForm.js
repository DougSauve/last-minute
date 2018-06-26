import React from 'react';
import './SignUpForm.scss';

const SignUpForm = (props) => (
  // props: {
  //   nameError = {props.nameError}
  //   emailError = {props.emailError}
  //   passwordError = {props.passwordError}
  //   passwordCheckError = {props.passwordCheckError}
  //   submitError = {this.props.submitError}
  // };
  <form className = "landing__sign-up-form">

    <div className = "event-container">
      <span className = "error">{props.submitError}</span>

      <div className = "property">
        <div className = "note">{'note: please avoid using the following reserved characters: <, >, \\, \', ", and &.'}</div>
      </div>

      <div className = "property">
        <div className = "key">Name:</div>
        <input
          className = "input"
          type = "text"
          name = "name"
          placeholder = "May Flower"
        />
        <span className = "error">{props.nameError}</span>
      </div>

      <div className = "property">
        <div className = "key">Email address:</div>
        <input
          className = "input"
          type = "email"
          name = "email"
          placeholder = "frozenyak@tibet.com"
        />
        <span className = "error">{props.emailError}</span>
      </div>

      <div className = "property">
        <div className = "key">Password (6+ long):</div>
        <input
          className = "input"
          type = "password"
          name = "password"
          placeholder = "loopyfish%"
        />
        <span className = "error">{props.passwordError}</span>
      </div>

      <div className = "property">
        <div className = "key">Password again:</div>
        <input
          className = "input"
          type = "password"
          name = "passwordCheck"
          placeholder = "loopyfish%"
        />
        <span className = "error">{props.passwordCheckError}</span>
      </div>

      <div className = "property">
        <div className = "key">Age Range:</div>
        <select
          className = "input"
          name = "ageRange"
        >
          <option value = "1">under 18</option>
          <option value = "2">18-30</option>
          <option value = "3">30-45</option>
          <option value = "4">45-60</option>
          <option value = "5">60+</option>
        </select>
      </div>

      <div className = "property">
        <div className = "key">Gender:</div>
        <select
          className = "input"
          name = "gender"
        >
          <option value = "Male">Male</option>
          <option value = "Female">Female</option>
          <option value = "Other">Other</option>
          <option value = "None">Prefer not to say</option>
        </select>
      </div>
    </div>
  </form>
);

export default SignUpForm;
