import React from 'react';
import './ShowPositionOnMapModal.scss';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import Modal from '../modal/_Modal';

import {handleKeyboardEvents} from '../../../../utils/handleKeyboardEvents';
import getDeviceType from '../../../../utils/getDeviceType';


class ShowPositionOnMapModal extends React.Component {

  componentDidMount() {
    //bind keyboard shortcuts
    document.onkeydown = handleKeyboardEvents.bind(this, ['escape', this.props.close], ['enter', this.props.close]);
  };

  componentWillUnMount() {
    document.onkeydown = handleKeyboardEvents.bind(this, ['escape', () => {}], ['enter', () => {}]);
  };

  render() {
    return (
     // props: {
     //   event = {props.event}
     //   close (function)
     // };

     <Modal
       close = {this.props.close}
       deviceType = {getDeviceType()}
      >
       <div className = "center">
         <div className = "map-note">
           {this.props.event.address}
         </div>

         <div className = "modal-item-container map-container--show-modal">
           {/* map */}
           <Map
             google = {this.props.google}
             initialCenter = {this.props.event.location}
             zoom = {15}
           >
             <Marker
               position = {this.props.event.location}
             />
           </Map>
         </div>

         <div
           className = "button background-none width15 showMap__button"
           onClick = {this.props.close}
         >
           Close
         </div>

       </div>
     </Modal>
   );
  };
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(ShowPositionOnMapModal);
