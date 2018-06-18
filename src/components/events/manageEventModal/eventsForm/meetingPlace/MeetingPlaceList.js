import React from 'react';

const MeetingPlaceList = (props) => (
  // props: {
  //   meetingPlacesList = {this.props.user.meetingPlaces}
  //   submitSlide3 (function)
  // }

  <div className = "meeting-place-list">
    Use a previous meeting place:

    {
      props.meetingPlacesList.map((meetingPlace) => {
        return (
          <div
            key = {Math.random()}
            className = "previous-meeting-place__list__choice-button"
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
