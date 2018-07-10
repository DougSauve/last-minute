import React, { Component } from 'react';

import Modal from '../../_common/modal/_Modal';
import EventsForm from './eventsForm/_EventsForm';
import DeleteEventModal from '../../_common/DeleteEventModal';

import {handleKeyboardEvents} from '../../../../utils/handleKeyboardEvents';

class ManageEventModal extends React.Component {

  componentDidMount() {
    if (this.props.mode === "delete") {
      document.onkeydown = (e) => {
        handleKeyboardEvents(['escape', this.props.close], e);
      };
    };
  };

  componentWillUnmount() {
    document.onkeydown = null;
  };

  render() {
    return (
     // props: {
     // mode = {this.props.mode}
     // close = {this.props.setMode.bind(this, undefined)}
     // }
     <div>
       <Modal
         close = {this.props.close}
       >
         {((this.props.mode === "create") || (this.props.mode === "update")) &&
           <EventsForm />
         }

         {(this.props.mode === "delete") &&
           <DeleteEventModal
           />
         }

       </Modal>
     </div>
   );
  };
};

export { ManageEventModal as default };
