import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import './CreateMeetingPlace_Map.scss';


// import { getAddress, getCoords } from './Geocode';
import { setPositionToStore, updateStorePosition } from './setPositionToStore';


class CreateMeetingPlace_Map extends React.Component {
  // props: {
  //   lat = {props.lat}
  //   lng = {props.lng}
  // }

  state = {
    initialCenter: null,
    address: null,
    readyForMap: false,
  }

  componentDidMount() {
    setPositionToStore().then((location) => {

      this.setState(() => ({
        initialCenter: {
          lat: location.lat,
          lng: location.lng,
        },
        address: location.address,
        readyForMap: true,
      }));
    })
    .catch((err) => console.log(err));
  }



  mapStyle = () => ({
    width: '50%',
    height: '50%',
  });

  onPositionChanged = async () => {
    const lat = await this.currentMarker.marker.position.lat();
    const lng = await this.currentMarker.marker.position.lng();

    updateStorePosition(lat, lng);
  }

  render() {
    return (
      <div className = "create-meeting-place-map">
        {(this.state.readyForMap) &&

          <div>
          {/* //input bar */}
          <form className = "create-meeting-place-address">
            <input type = "text" name = "address" defaultValue = {this.state.address} />
          </form>

          {/* //map */}
          <Map className = "create-meeting-place-map__map"
            google = {this.props.google}
            initialCenter = {this.state.initialCenter}
            zoom = {15}
            style = {this.mapStyle()}
            >
              <Marker
                position = {this.state.initialCenter}
                draggable = {true}
                onDragend = {this.onPositionChanged}
                ref = {(Marker) => this.currentMarker = Marker}
              />

            </Map>
          </div>
        }
      </div>
    );
  };
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(CreateMeetingPlace_Map);
