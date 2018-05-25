import React, { Component } from 'react';

import './_ManageEventModal.scss';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';
import Modal from '../../_common/modal/_Modal';

import EventsForm from './eventsForm/_EventsForm';
import HandleDelete from './HandleDelete';

const ManageEventModal = (props) => (
  // props: {
  //   setModalMode (function): set the mode of the modal
  //   mode (string): current mode
  // }
  <div>
    <Modal>

      <div className = "events__modal__title">
        {capitalizeFirstLetter(props.mode)}
      </div>

      {((props.mode === "create") || (props.mode === "update")) &&
        <EventsForm />
      }

      {(props.mode === "delete") &&
        <HandleDelete />
      }

    </Modal>
  </div>
);

export { ManageEventModal as default };
