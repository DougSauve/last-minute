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
    //set initial position in state - start at USA map
    this.setState(() => ({
      initialCenter: {
        lat: 35,
        lng:-92,
      },
      address: '',
      readyForMap: true,
    }));


    setPositionToStore().then((location) => {
      if (!location.err) {
        //if it works
        this.setState(() => ({
          initialCenter: {
            lat: location.lat,
            lng: location.lng,
          },
          zoom: 15,
          address: location.address,
        }));

        this.currentMarker.marker.setPosition({ lat: location.lat, lng: location.lng });
        this.currentMap.map.setCenter({ lat: location.lat, lng: location.lng });
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
    this.currentMarker.marker.setPosition({ lat: coords.lat, lng: coords.lng });
    this.currentMap.map.setCenter({ lat: coords.lat, lng: coords.lng });
    this.setState(() => ({ zoom: 15 }));
  };

  submitLocation = () => {
    const place = document.getElementsByClassName("events__create-event-modal__slide3__form")[0].elements.place.value;

    this.props.submitSlide3(
      place,
      {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      this.props.address
    );

    this.props.setShowCreateMeetingPlace.bind(this, false);
  };

  render() {
    return (
      <div className = "create-meeting-place">
        {(this.state.readyForMap) &&

          <div className = "create-meeting-place-wrapper">

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

            <form className = "events__create-event-modal__slide3__form">

              <span
                className = "form-heading"
              >
                Name of meeting place:
              </span>
              <br />

              <span className = "events__form__error">{this.props.placeError}</span>

              <span className = "form-secondary-text">
                For safety, please choose a public place close to your event, and go to your event's location from there.
              </span>
              <br />

              <input
                type = "text"
                name = "place"
                defaultValue = {(this.props.place) && this.props.place}
              />
              <br />

              {/* <span className = "events__form__error">{props.placeError}</span> */}
              <br />

            </form>

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
