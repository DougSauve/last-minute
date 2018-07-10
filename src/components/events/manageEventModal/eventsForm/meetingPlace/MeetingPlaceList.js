import React from 'react';
import './MeetingPlaceList.scss';

const MeetingPlaceList = (props) => (
  // props: {
  //   meetingPlacesList = {this.props.user.meetingPlaces}
  //   submitSlide3 (function)
  // }

  <div>
    {props.meetingPlacesList[0] &&

    <div className = "meeting-place-list center">
      Previous meeting places:

      {
        props.meetingPlacesList.map((meetingPlace, index) => {
          return (
            <div
              className = "row--align-left center-vertically"
              key = {index}
            >
              <div
                className = "button background-green width15"
                onClick = {props.submitSlide3.bind(this, meetingPlace.name, meetingPlace.location, meetingPlace.address)}
              >
                {meetingPlace.name}
              </div>

              <div
                className = "unsquishable remove-meetingPlace-button"
                onClick = {props.deleteMeetingPlace.bind(this, meetingPlace)}
              >
                x
              </div>
            </div>
          );
        })

      }
      or
    </div>
  }
</div>
);

export default MeetingPlaceList;
