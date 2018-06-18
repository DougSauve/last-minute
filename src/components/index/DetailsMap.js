import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const DetailsMap = (props) => (
  <Map
    google = {props.google}
    initialCenter = {props.event.location}
    zoom = {15}
    style = {{position: 'fixed', top: '500px', width: '50%', height: '50%'}}
  >
    <Marker position = {props.event.location} />
  </Map>
);

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(DetailsMap);
