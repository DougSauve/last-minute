import React from 'react';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class ChangeAgeRangeModal extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.showChangeAgeRangeModal) {
        handleKeyboardEvents(['escape', this.props.closeModal], ['enter', this.props.submitNewAgeRange], e);
      };
    };
  };

  render() {
    return (
      // props: {
      // userFriendlyAgeRange = {makeAgeRangeUserFriendly(this.props.user.ageRange)}
      // submitNewAgeRange = {this.submitNewAgeRange}
      // closeModal = {this.closeModal}
      // submitError = {this.props.submitError}
      // }
      <div className = "padding-1rem center">
        <div className = "header--modal">
          <div className = "size2">
            Change your age range
          </div>
        </div>

        <div className = "note">Note: You may only change your age range once every five years.</div>

        <div className = "modal-item-container">
          <form
            action = "javascript:void(0);"
            className = "profile__change-ageRange-modal__form profile-spacing"
          >

            <div className = "property">
              <div className = "key--no-length width15">Password:</div>
              <div className = "value">
                <input
                  className = "input"
                  type = "password"
                  name = "password"
                  autoFocus
                />
              </div>
            </div>

            <div className = "property">
              <div className = "key--no-length width15">New Age Range:</div>
              <select
                className = "input short-value"
                name = "ageRange"
              >
                <option value = "1">under 18</option>
                <option value = "2">18-30</option>
                <option value = "3">30-45</option>
                <option value = "4">45-60</option>
                <option value = "5">60+</option>
              </select>
            </div>
          </form>
        </div>

        <span className = "error">{this.props.submitError}</span>

        <div className = "button-container">
          <div className = "button width15 background-green"
            onClick = {this.props.submitNewAgeRange}
          >
            Submit
          </div>

          <div className = "button width15 background-none"
            onClick = {this.props.closeModal}
          >
            Cancel
          </div>
        </div>

      </div>
    );
  };
}


export default ChangeAgeRangeModal;
