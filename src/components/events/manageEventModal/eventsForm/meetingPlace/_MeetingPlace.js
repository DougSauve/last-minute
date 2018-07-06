import React from 'react';

import './_MeetingPlace.scss';

import { connect } from 'react-redux';
import { setCurrentPlace, setCurrentAddress } from '../../../../../redux/currentLocation';

import { SetPositionOnMapModal } from '../../../../_common/maps/_Maps';
import MeetingPlaceList from './MeetingPlaceList';

class MeetingPlace extends React.Component {
  // props: {
  //   submitSlide3 = {this.props.submitSlide3}
  // }

  state = {
    previousMeetingPlacesExist: (!!this.props.user.meetingPlaces[0]),
    showMapModal: false,
  }

  setShowMapModal = (value) => {
    this.setState(() => ({ showMapModal: value }))
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to choose a new meeting place, or use a previous one.');
  };

  onSubmitMapModal = (place, location, address) => {
    if (this.props.submitSlide3(place, location, address)) {
      this.setShowMapModal(false);
    };
  };

  render() {
    return (
      <div className = "modal-item-container">

        {(this.state.previousMeetingPlacesExist) &&
          <MeetingPlaceList
            meetingPlacesList = {this.props.user.meetingPlaces}
            submitSlide3 = {this.props.submitSlide3}
          />
        }

        {
          <div
            className = "button background-blue width15"
            onClick = {() => {
              //check for internet access
              if (window.navigator.onLine) {
                this.setShowMapModal(true);
              }else{
                this.showNoInternetAlert();
              }
            }}
          >
            New meeting place
          </div>
        }

        <div
          className = "button background-none width15"
          onClick = {this.props.closeModal}
        >
          Cancel
        </div>

        {
          (this.state.showMapModal) &&
          <SetPositionOnMapModal
            submit = {this.onSubmitMapModal}
            cancel = {this.setShowMapModal.bind(this, false)}
            lat = {this.props.lat}
            lng = {this.props.lng}
            address = {this.props.address}
            setCurrentPlace = {this.props.setCurrentPlace}
            setCurrentAddress = {this.props.setCurrentAddress}
            mapNote = {'Choose a meeting place on the map or enter an address instead. For safety, meet at a public place and go to your event from there.'}
            place = {this.props.place}
            placeError = {this.props.placeError}
          />
        }

      </div>
    )
  }
};

const mapStateToProps = (reduxState) => ({
  user: reduxState.userReducer.user,
  myEvent: reduxState.myEventReducer.myEvent,
  placeError: reduxState.eventsFormErrorsReducer.placeError,

  place: reduxState.currentLocationReducer.place,
  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,
});

const mapDispatchToProps = {
  setCurrentPlace,
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPlace);
