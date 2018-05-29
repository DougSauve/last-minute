import React from 'react';

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

    <span>{'note: please avoid using the following reserved characters: <, >, \\, \', ", and &.'}</span>

    <span>Name:</span>
    <input
      className = "landing__sign-up-form__name"
      type = "text"
      name = "name"
      placeholder = "Jebediah BashWashy Jr. III"
    />
    <span className = "landing__form__error">{props.nameError}</span>
    <br />

    <span>Email address:</span>
    <input
      className = "landing__sign-up-form__email"
      type = "email"
      name = "email"
      placeholder = "bearded_yak101@yaksRus.com"
    />
    <span className = "landing__form__error">{props.emailError}</span>
    <br />

    <span>Password:</span>
    <span>Password must be at least 6 characters long.</span>
    <input
      className = "landing__sign-up-form__password"
      type = "password"
      name = "password"
      placeholder = "loopyfishXX$%"
    />
    <span className = "landing__form__error">{props.passwordError}</span>
    <br />

    <span>Enter Password again:</span>
    <input
      className = "landing__sign-up-form__passwordCheck"
      type = "password"
      name = "passwordCheck"
      placeholder = "loopyfishXX$%"
    />
    <span className = "landing__form__error">{props.passwordCheckError}</span>
    <br />

    <span>Age Range:</span>
    <select
      className = "landing__sign-up-form__ageRange"
      name = "ageRange"
    >
      <option value = "1">under 18</option>
      <option value = "2">18-30</option>
      <option value = "3">30-45</option>
      <option value = "4">45-60</option>
      <option value = "5">60+</option>
    </select>
    <br />

    <span>Gender:</span>
    <select
      className = "profile__form__input-gender"
      name = "gender"
    >
      <option value = "Male">Male</option>
      <option value = "Female">Female</option>
      <option value = "Other">Other</option>
      <option value = "None">Prefer not to say</option>
    </select>

  </form>
);

export default SignUpForm;
