import React from 'react';

const MeetingPlaceList = (props) => (
  // props: {
  //   meetingPlacesList = {this.props.user.meetingPlaces}
  // }

  <div className = "meeting-place-list">
    Use a previous meeting place:

    {
      props.meetingPlacesList.map((meetingPlace) => {
        return (
          <div
            key = {Math.random()}
            className = "previous-meeting-place__list__choice-button"
            onClick = {this.props.submitSlide3(meetingPlace.location, meetingPlace.address)}
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
