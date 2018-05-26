import React from 'react';
const socket = io();

import './_MeetingPlace.scss';

import MeetingPlaceList from './MeetingPlaceList';
import CreateMeetingPlace from './CreateMeetingPlace';

class MeetingPlace extends React.Component {

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
          <CreateMeetingPlace />
        }

      </div>
    )
  }
};

export default MeetingPlace;
