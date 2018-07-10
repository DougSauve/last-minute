import React from 'react';

import './_MeetingPlace.scss';

import { connect } from 'react-redux';
import { setCurrentPlace, setCurrentCoordinates, setCurrentAddress } from '../../../../../redux/currentLocation';
import { setUser } from '../../../../../redux/user';

import SetPositionOnMapModal from '../../../../_common/maps/SetPositionOnMapModal';
import MeetingPlaceList from './MeetingPlaceList';

import {handleKeyboardEvents} from '../../../../../../utils/handleKeyboardEvents';

class MeetingPlace extends React.Component {
  // props: {
  //   submitSlide3 = {this.props.submitSlide3}
  // }

  state = {
    previousMeetingPlacesExist: (!!this.props.user.meetingPlaces[0]),
    showMapModal: false,
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.currentSlide === "3" && (this.state.showMapModal === false)) {
          handleKeyboardEvents(['enter', this.tryToOpenMap], ['escape', this.props.closeModal], e);
      };
    };
  };

  componentDidUpdate() {
    if (this.props.currentSlide === "3" && (this.state.showMapModal === false)) {
      document.onkeydown = (e) => {
        handleKeyboardEvents(['enter', this.tryToOpenMap], ['escape', this.props.closeModal], e);
      };
    };
  };

  componentWillUnmount() {
    document.onkeydown = null;
  };

  setShowMapModal = (value) => {
    this.setState(() => ({ showMapModal: value }))
  };

  showNoInternetAlert = () => {
    alert('Please connect to the internet to choose a new meeting place, or use a previous one.');
  };

  onSubmitMapModal = async (place, location, address) => {
    if (await this.props.submitSlide3(place, location, address)) {
      // this.setShowMapModal(false);
    };
  };

  tryToOpenMap = () => {
    //check for internet access
    if (window.navigator.onLine) {
      this.setShowMapModal(false);
      this.setShowMapModal(true);
    }else{
      this.showNoInternetAlert();
    }
  };

  deleteMeetingPlace = (meetingPlace) => {
    this.props.socket.emit('deleteMeetingPlaceFromUser', { user: this.props.user, _id: meetingPlace._id }, (err, res) => {
      if (err) {
        this.props.setUserSubmitError(err);
      } else {
        this.props.socket.emit('setCurrentUser', res, () => {
          this.props.setUser(res);
        });
      };
    });
  };


  render() {
    return (
      <div className = "modal-item-container">

        {(this.state.previousMeetingPlacesExist) &&
          <MeetingPlaceList
            meetingPlacesList = {this.props.user.meetingPlaces}
            submitSlide3 = {this.props.submitSlide3}
            deleteMeetingPlace = {this.deleteMeetingPlace}
          />
        }

        {
          <div
            className = "button background-blue width15"
            onClick = {this.tryToOpenMap}
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

        {this.state.showMapModal &&
          //mountMap() <- switch showMapModal off, then on, then mount it
          <SetPositionOnMapModal
            submit = {this.onSubmitMapModal}
            cancel = {this.setShowMapModal.bind(this, false)}
            lat = {this.props.lat}
            lng = {this.props.lng}
            address = {this.props.address}
            mapNote = {'Choose a meeting place on the map or enter an address instead. For safety, meet at a public place and go to your event from there.'}
            place = {this.props.place}
            mapError = {this.props.mapError}

            //for using setMap in /update mode - these four need to stay together
            mode = {this.props.mode}
            setCurrentPlace = {this.props.setCurrentPlace}
            setCurrentCoordinates = {this.props.setCurrentCoordinates}
            setCurrentAddress = {this.props.setCurrentAddress}
          />
        }

      </div>
    )
  }
};

const mapStateToProps = (reduxState) => ({
  socket: reduxState.socketReducer.socket,

  user: reduxState.userReducer.user,
  myEvent: reduxState.myEventReducer.myEvent,

  mapError: reduxState.landingFormErrorsReducer.mapError,
  place: reduxState.currentLocationReducer.place,
  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,

  mode: reduxState.eventsReducer.mode,
});

const mapDispatchToProps = {
  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,

  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPlace);
