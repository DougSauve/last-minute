import React from 'react';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class ChangeEmailModal extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.showChangeEmailModal) {
        handleKeyboardEvents(['escape', this.props.closeModal], ['enter', this.props.requestEmailReset], e);
      };
    };
  };

  render() {
    return (
     // props: {
       // requestEmailReset = {this.requestEmailReset}
       // closeModal = {this.closeModal}
       // submitError = {this.props.submitError}
     // }
     <div className = "padding-1rem center">
       <div className = "header--modal">
         <div className = "size2">
           Change your email address
         </div>
       </div>

       <div className = "modal-item-container">
         <form className = "profile__change-email-modal__form profile-spacing">

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
             <div className = "key--no-length width15">New email address:</div>
             <div className = "value">
               <input
                 className = "input"
                 type = "email"
                 name = "newEmail"
               />
             </div>
           </div>

           <div className = "property">
             <div className = "key--no-length width15">New email address again:</div>
             <div className = "value">
               <input
                 className = "input"
                 type = "email"
                 name = "newEmailCheck"
               />
             </div>
           </div>
         </form>

       </div>

       <span className = "error">{this.props.submitError}</span>

       <div className = "button-container">
         <div className = "button width15 background-green"
           onClick = {this.props.requestEmailReset}
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
};

export default ChangeEmailModal;
