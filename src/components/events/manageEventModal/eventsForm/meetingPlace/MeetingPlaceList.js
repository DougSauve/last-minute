import React from 'react';

const MeetingPlaceList = (props) => (
  // props: {
  //   meetingPlacesList = {this.props.user.meetingPlaces}
  //   submitSlide3 (function)
  // }

  <div className = "meeting-place-list center">
    Previous meeting places:

    {
      props.meetingPlacesList.map((meetingPlace) => {
        return (
          <div
            key = {Math.random()}
            className = "button background-green width15"
            onClick = {props.submitSlide3.bind(this, meetingPlace.name, meetingPlace.location, meetingPlace.address)}
            >
            {meetingPlace.name}
          </div>
        );
      })

    }
    or
  </div>
);

export default MeetingPlaceList;
