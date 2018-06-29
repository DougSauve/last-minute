import React, { Component } from 'react';

import './_ManageEventModal.scss';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';
import Modal from '../../_common/modal/_Modal';
import DeleteEventModal from '../../_common/DeleteEventModal';

import EventsForm from './eventsForm/_EventsForm';

const ManageEventModal = (props) => (
  // props: {
  //   setModalMode (function): set the mode of the modal
  //   mode (string): current mode
  // }
  <div>
    <Modal>

      {((props.mode === "create") || (props.mode === "update")) &&
        <EventsForm />
      }

      {(props.mode === "delete") &&
        <DeleteEventModal />
      }

    </Modal>
  </div>
);

export { ManageEventModal as default };
