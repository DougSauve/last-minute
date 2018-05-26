import React from 'react';
import { connect } from 'react-redux';

import CreateMeetingPlace_Map from './CreateMeetingPlace_Map';

const CreateMeetingPlace = (props) => (
  <div className = "create-meeting-place">

    {(true) &&
      <CreateMeetingPlace_Map
        lat = {props.lat}
        lng = {props.lng}
      />
    }
  </div>
);


const mapStateToProps = (reduxState) => ({
  lat: reduxState.currentLocationReducer.lat,
  lng: reduxState.currentLocationReducer.lng,
  address: reduxState.currentLocationReducer.address,
});

export default connect(mapStateToProps)(CreateMeetingPlace);
