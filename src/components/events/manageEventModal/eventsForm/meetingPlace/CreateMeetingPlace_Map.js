import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import './CreateMeetingPlace_Map.scss';


class CreateMeetingPlace_Map extends React.Component {

  mapStyle = () => ({
    width: '50%',
    height: '50%',
  });

  sayCoords = async (LatLng) => {
    console.log(LatLng);
  }

  center = () => ({ lat: 45, lng: -92 });

  render() {
    return (
      <div className = "create-meeting-place-map">
        <Map className = "create-meeting-place-map__map"
          google = {this.props.google}
          initialCenter = {this.center()}
          zoom = {3}
          style = {this.mapStyle()}
        >
          <Marker
            position = {this.center()}
            draggable = {true}
            onDragend = {this.sayCoords.(google.maps.LatLng())}
        />

        </Map>
      </div>
    );
  };
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(CreateMeetingPlace_Map);
