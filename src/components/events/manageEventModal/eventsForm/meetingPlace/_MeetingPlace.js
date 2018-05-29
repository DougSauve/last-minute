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
    previousMeetingPlacesExist: true,
    showCreateMeetingPlace: true,
  }

  render() {
    return (
      <div className = "meeting-place">
        {/* if there are previous meeting places, suggest those in a list: MeetingPlaceList should render. Otherwise, createMeetingPlace should render. */}

        {(this.state.previousMeetingPlacesExist) &&
          <MeetingPlaceList />
        }

        {(this.state.showCreateMeetingPlace) &&
          <CreateMeetingPlace
            submitSlide3 = {this.props.submitSlide3}

            lat = {this.props.lat}
            lng = {this.props.lng}
            address = {this.props.address}
            setCurrentAddress = {this.props.setCurrentAddress}
          />
        }

      </div>
    )
  }
};

const mapStateToProps = (reduxState) => ({
  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,
});

const mapDispatchToProps = {
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPlace);
