import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { getCoords } from './Geocode';
import './CreateMeetingPlace.scss';


// import { getAddress, getCoords } from './Geocode';
import { setPositionToStore, updateStoreLocation } from './setPositionToStore';


class CreateMeetingPlace extends React.Component {
  // props: {
  //   submitSlide3 = {this.props.submitSlide3}
  //   lat = {props.lat}
  //   lng = {props.lng}
  //   address = {props.address}
  //   setCurrentAddress = {props.setCurrentAddress}
  // }

  state = {
    initialCenter: null,
    address: null,
    zoom: 4,
    readyForMap: false,
  };

  componentDidMount() {
    //set initial position in state
    setPositionToStore().then((location) => {
      if (location.err) {
        //if geolocation doesn't work
        this.setState(() => ({
          initialCenter: {
            lat: 35,
            lng:-92,
          },
          address: location.err,
          readyForMap: true,
        }));
      } else {
        //if it does
        this.setState(() => ({
          initialCenter: {
            lat: location.lat,
            lng: location.lng,
          },
          zoom: 15,
          address: location.address,
          readyForMap: true,
        }));
      }
    });
  }

  mapStyle = () => ({
    width: '50%',
    height: '50%',
  });

  onPositionChanged = async () => {
    const lat = await this.currentMarker.marker.position.lat();
    const lng = await this.currentMarker.marker.position.lng();

    updateStoreLocation(lat, lng);
  }

  changeAddress = (e) => {
    this.props.setCurrentAddress(e.target.value);
  };

  showAddressOnMap = async () => {
    const coords = await getCoords(this.props.address);
    console.log('coords', coords);
    this.currentMarker.marker.setPosition({ lat: coords.lat, lng: coords.lng });
    this.currentMap.map.setCenter({ lat: coords.lat, lng: coords.lng });
    this.setState(() => ({ zoom: 15 }));
  };

  submitLocation = () => {
    console.log('writing to db:', this.props.address, this.props.lat, this.props.lng);
    console.log(this.props.submitSlide3);
    this.props.submitSlide3();
  };

  render() {
    return (
      <div className = "create-meeting-place">
        {(this.state.readyForMap) &&

          <div>

          {/* //input bar */}
          <form className = "create-meeting-place-address">
            <input
              className = "create-meeting-place-address__search-input"
              type = "text"
              name = "address"
              value = {this.props.address}
              onChange = {this.changeAddress}
              autoFocus
            />
          </form>
          {/* find on map button */}
          <div
            className = "create-meeting-place-address__find-button"
            onClick = {this.showAddressOnMap}
          >
            Find on map
          </div>

          {/* //map */}
          <Map className = "create-meeting-place__map"
            google = {this.props.google}
            initialCenter = {this.state.initialCenter}
            zoom = {this.state.zoom}
            ref = {(Map) => this.currentMap = Map}
            style = {this.mapStyle()}
            >
              <Marker
                position = {this.state.initialCenter}
                draggable = {true}
                onDragend = {this.onPositionChanged}
                ref = {(Marker) => this.currentMarker = Marker}
              />

            </Map>

            {/* use this place button */}
            <div
              className = "create-meeting-place-address__submit-button"
              onClick = {this.submitLocation}
            >
              Use this place
            </div>
          </div>
        }
      </div>
    );
  };
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(CreateMeetingPlace);
