import React from 'react';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class VerifyDeleteModal extends React.Component{

  componentDidMount() {
    this.props.clearDeleteProfileError();

    document.onkeydown = (e) => {
      if (this.props.showVerifyDeleteModal) {
        handleKeyboardEvents(['escape', this.props.closeModal], ['enter', this.props.deleteProfile], e);
      };
    };
  };

  render() {
    return (
      // props {
      // submitError = {this.props.submitError}
      // deleteProfile = {this.deleteProfile}
      // closeModal = {this.closeModal}
      // }
      <div className = "modal-padding center">

        <div className = "warning">Are you sure you want to delete your profile? This cannot be undone.</div>
        <div className = "message">Please note that you must remove any events that you are hosting before you can delete your profile.</div>

        {(this.props.submitError || this.props.deleteProfileError) &&
          <span className = "error rem-above">{this.props.submitError}{this.props.deleteProfileError}</span>
        }
        
        <div className = "button-container">

          <div className = "button width15 background-none"
            onClick = {this.props.closeModal}
          >
            Cancel
          </div>

          <div className = "button width15 background-red"
            onClick = {this.props.deleteProfile}
          >
            Delete
          </div>
        </div>
      </div>
    );
  };
};

export { VerifyDeleteModal as default };
