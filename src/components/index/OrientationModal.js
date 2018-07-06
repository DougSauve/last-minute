import React from 'react';
import './OrientationModal.scss';

const OrientationModal = (props) => (
  <div className = "modal-item-container">

    <div className = "header--modal">
      <div className = "size2">
        You're in! A couple of things to get you started:
      </div>
    </div>

    <div className = "orientation__row">

      <div className = "orientation__item message center">
        <span>
          <b>Every event you see here will happen within 24 hours.</b> No event can be posted more than 24 hours in advance.
        </span>
      </div>

      <div className = "orientation__item message center">
         <span>
           <b>Everyone is welcome to nearly everything.</b> Some events specify certain things, like 'competitive players only please' for a ping pong game or 'under 18 only please' for a teenage girl's shopping event. Please respect these requests.
         </span>
       </div>
       <div className = "orientation__item message center">
          <span>
            <b>If you are hosting an event</b>, please don't exclude anyone unless it is <b>for someone's safety</b> or <b>to request competitive players only at a competitive game</b>.
          </span>
      </div>

    </div>

    <div
      className = "button background-none width15"
      onClick = {props.closeModal}
    >
      Got it
    </div>
  </div>
);

export { OrientationModal as default };
