import React from 'react';
import './ShowPositionOnMapModal.scss';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import Modal from '../modal/_Modal';

const ShowPositionOnMapModal = (props) => (
  // props: {
  //   event = {props.event}
  //   close (function)
  // };

  <Modal>
    <div className = "center">

      <div className = "map-note">
        {props.event.address}
      </div>

      <div className = "modal-item-container map-container--show-modal">
        {/* map */}
        <Map
          google = {props.google}
          initialCenter = {props.event.location}
          zoom = {15}
        >
          <Marker
            position = {props.event.location}
          />
        </Map>
      </div>

      <div
        className = "button background-none width15"
        onClick = {props.close}
      >
        Close
      </div>

    </div>
  </Modal>
);

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(ShowPositionOnMapModal);
