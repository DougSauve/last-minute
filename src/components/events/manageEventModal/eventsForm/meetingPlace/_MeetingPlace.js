import React from 'react';

import './_MeetingPlace.scss';

import { connect } from 'react-redux';
import { setCurrentAddress } from '../../../../../redux/currentLocation';

import MeetingPlaceList from './MeetingPlaceList';
import CreateMeetingPlace from './CreateMeetingPlace';

class MeetingPlace extends React.Component {
  // props: {
  //   submitSlide3 = {this.props.submitSlide3}
  // }

  state = {
    previousMeetingPlacesExist: (!!this.props.user.meetingPlaces[0]),
    showCreateMeetingPlace: false,
  }

  setShowCreateMeetingPlace = (value) => {
    this.setState(() => ({ showCreateMeetingPlace: value }))
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to choose a new meeting place, or use a previous one.');
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
            className = "button background-green width15"
            onClick = {() => {
              //check for internet access
              if (window.navigator.onLine) {
                this.setShowCreateMeetingPlace(true);
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

        {(this.state.showCreateMeetingPlace) &&
          <CreateMeetingPlace
            submitSlide3 = {this.props.submitSlide3}
            setShowCreateMeetingPlace = {this.setShowCreateMeetingPlace}

            lat = {this.props.lat}
            lng = {this.props.lng}
            address = {this.props.address}
            setCurrentAddress = {this.props.setCurrentAddress}

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

  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,
});

const mapDispatchToProps = {
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPlace);
