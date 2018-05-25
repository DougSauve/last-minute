import React from 'react';

import CreateMeetingPlace_Map from './CreateMeetingPlace_Map';
import CreateMeetingPlace_Address from './CreateMeetingPlace_Address';

const CreateMeetingPlace = (props) => (
  <div className = "create-meeting-place">
    {(true) &&
      <CreateMeetingPlace_Address />
    }
    {(true) &&
      <CreateMeetingPlace_Map />
    }
  </div>
);

export default CreateMeetingPlace;
