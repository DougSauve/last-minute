import React from 'react';

const UserProfileForm = (props) => (
  <form className = "profile__form">
    Name:
    <input
      className = "profile__form__input-name"
      type = "text"
      name = "name"
      disabled = "true"
    />
    <br />

    Password:
    {/* if password is changed, send an email to verify the change (retype the new password). */}
    <input
      className = "profile__form__password"
      type = "password"
      name = "password"
    />
    <br />

    Email:
    {/* if email address is changed, verify it */}
    <input
      className = "profile__form__input-email-address"
      type = "email"
      name = "email"
    />
    <br />

    Age Range:
    {/* age range can only be changed once every 5 years*/}
    <select
      className = "profile__form__input-age-range"
      name = "ageRange"
    >
      <option value = {props.ageRange ? props.ageRange : ""}>
        {props.ageRange && props.ageRange}
      </option>
      <option value = "1">under 18</option>
      <option value = "2">18-30</option>
      <option value = "3">30-45</option>
      <option value = "4">45-60</option>
      <option value = "5">60+</option>
    </select>
    <br />

    Gender:
    <select
      className = "profile__form__input-gender"
      name = "gender"
    >
      <option value = {props.gender ? props.gender : ""}>
        {props.gender && props.gender}
      </option>
      <option value = "Male">Male</option>
      <option value = "Female">Female</option>
      <option value = "Other">Other</option>
      <option value = "None">Prefer not to say</option>
    </select>
    <br />

  </form>
);

export { UserProfileForm as default };
