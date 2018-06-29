import React from 'react';
import './SetPositionOnMapModal.scss';

import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import Modal from '../modal/_Modal';
import { getCoords } from './Geocode';
import { setPositionToStore, updateStoreLocation } from './setPositionToStore';


class SetPositionOnMapModal extends React.Component {
  // props: {
  //   submit = function to call on submit - return place, lat, lng, and address
  //   cancel = function to call on cancel
  //   lat = {props.lat}
  //   lng = {props.lng}
  //   address = {props.address}
  //   setCurrentPlace = {props.setCurrentPlace}
  //   setCurrentAddress = {props.setCurrentAddress}
  //   mapNote (string)
  //   place (string)
  //   mapError (String)

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

    //if a starting location was passed in
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
      };
    });
  };

  onPositionChanged = async () => {
    const lat = await this.currentMarker.marker.position.lat();
    const lng = await this.currentMarker.marker.position.lng();

    updateStoreLocation(lat, lng);
  };

  changePlace = (e) => {
    this.props.setCurrentPlace(e.target.value);
  };

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
      <div>
        {(this.state.readyForMap) &&

        <Modal
          close = {this.props.cancel}
          >
          <div className = "center">
            <div className = "map-note">
              {this.props.mapNote}
            </div>
          </div>

          <div className = "center--row">

            <div className = "modal-item-container map-container flex-fill-space">
              {/* map */}
              <Map
                google = {this.props.google}
                initialCenter = {this.state.initialCenter}
                zoom = {this.state.zoom}
                ref = {(Map) => this.currentMap = Map}
              >
                <Marker
                  position = {this.state.initialCenter}
                  draggable = {true}
                  onDragend = {this.onPositionChanged}
                  ref = {(Marker) => this.currentMarker = Marker}
                />
              </Map>
            </div>

            <form className = "modal-item-container map-height center flex-fill-space">

                <div className = "value--no-width">
                  Search for an address:
                </div>

                <div className = "value--no-width">
                  <input
                    className = "input"
                    type = "text"
                    name = "address"
                    value = {this.props.address}
                    onChange = {this.changeAddress}
                    autoFocus
                  />
                </div>

                <div className = "value--no-width">
                  <div
                    className = "button width15 background-blue"
                    onClick = {this.showAddressOnMap}
                  >
                    Find on map
                  </div>
                </div>

                <div className = "flex-spacer" />

                <div className = "center">
                </div>

                <div className = "value--no-width">
                  Name this place:
                </div>

                <input
                  className = "input width15"
                  type = "text"
                  name = "place"
                  value = {this.props.place}
                  onChange = {this.changePlace}
                />

                <div className = "error width15 rem-top-bottom">{this.props.mapError}</div>

                <div className = "value--no-width">
                  <div
                    className = "button width15 background-green"
                    onClick = {this.props.submit.bind(this, this.props.place, {lat: this.props.lat, lng: this.props.lng}, this.props.address)}
                  >
                    Use this place
                  </div>
                </div>
              {/* </div> */}

              <div className = "value--no-width">
                <div
                  className = "button width15 background-none"
                  onClick = {this.props.cancel}
                >
                  Cancel
                </div>
              </div>

            </form>
          </div>
        </Modal>
        }
      </div>
    );
  };
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs' })(SetPositionOnMapModal);
