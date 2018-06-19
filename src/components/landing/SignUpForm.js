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
    <span className = "landing__form__error">{props.submitError}</span>

    <div className = "landing__form__property">
      <div className = "landing__form__note landing__text__style">{'note: please avoid using the following reserved characters: <, >, \\, \', ", and &.'}</div>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Name:</div>
      <input
        className = "landing__sign-up-form__input landing__input"
        type = "text"
        name = "name"
        placeholder = "Ella Borate"
      />
      <span className = "landing__form__error">{props.nameError}</span>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Email address:</div>
      <input
        className = "landing__sign-up-form__input landing__input"
        type = "email"
        name = "email"
        placeholder = "frozenyak@tibet.com"
      />
      <span className = "landing__form__error">{props.emailError}</span>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Password (6+ long):</div>
      <input
        className = "landing__sign-up-form__input landing__input"
        type = "password"
        name = "password"
        placeholder = "loopyfish%"
      />
      <span className = "landing__form__error">{props.passwordError}</span>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Password again:</div>
      <input
        className = "landing__sign-up-form__input landing__input"
        type = "password"
        name = "passwordCheck"
        placeholder = "loopyfish%"
      />
      <span className = "landing__form__error">{props.passwordCheckError}</span>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Age Range:</div>
      <select
        className = "landing__input"
        name = "ageRange"
      >
        <option value = "1">under 18</option>
        <option value = "2">18-30</option>
        <option value = "3">30-45</option>
        <option value = "4">45-60</option>
        <option value = "5">60+</option>
      </select>
    </div>

    <div className = "landing__form__property">
      <div className = "landing__form__key">Gender:</div>
      <select
        className = "landing__input"
        name = "gender"
      >
        <option value = "Male">Male</option>
        <option value = "Female">Female</option>
        <option value = "Other">Other</option>
        <option value = "None">Prefer not to say</option>
      </select>
    </div>

  </form>
);

export default SignUpForm;
