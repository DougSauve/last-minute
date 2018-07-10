import React from 'react';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class ChangePasswordModal extends React.Component {

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.showChangePasswordModal) {
        handleKeyboardEvents(['escape', this.props.closeModal], ['enter', this.props.requestPasswordReset], e);
      };
    };
  };

  render() {
    return (
     // props: {
       // requestPasswordReset = {this.requestPasswordReset}
       // closeModal = {this.closeModal}
       // submitError = {this.props.submitError}
     // }
     <div className = "padding-1rem center">
       <div className = "header--modal">
         <div className = "size2">
           Change your password
         </div>
       </div>

       <div className = "modal-item-container">
         <form className = "profile__change-password-modal__form profile-spacing">


           <div className = "property">
             <div className = "key--no-length width15">Current password:</div>
             <div className = "value">
               <input
                 className = "input"
                 type = "password"
                 name = "oldPassword"
                 autoFocus
               />
             </div>
           </div>

           <div className = "property">
             <div className = "key--no-length width15">New password (6+ long):</div>
             <div className = "value">
               <input
                 className = "input"
                 type = "password"
                 name = "newPassword"
               />
             </div>
           </div>

           <div className = "property">
             <div className = "key--no-length width15">New password again:</div>
             <div className = "value">
               <input
                 className = "input"
                 type = "password"
                 name = "newPasswordCheck"
               />
             </div>
           </div>
         </form>

       </div>

       <span className = "error">{this.props.submitError}</span>

       <div className = "button-container">
         <div className = "button width15 background-green"
           onClick = {this.props.requestPasswordReset}
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

export default ChangePasswordModal;
