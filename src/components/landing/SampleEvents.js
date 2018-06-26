import React from 'react';

import './SampleEvents.scss';

const SampleEvents = () => (
  <div className = "landing__sample-events">

    <div className = "list-event-container">

      <div className = "title">Shooting Hoops</div>
      <div className = "distance">1.3 miles away</div>

      <div className = "property">
        <div className = "key">Host:</div>
        <div className = "value">
          Adil A. <span className = "secondary-text">Male, age 30-45</span>
        </div>
      </div>

      <div className = "property">
        <div className = "key">Meet at:</div>
        <div className = "value">
          Cypress Hill Park basketball courts
        </div>
      </div>

      <div className = "property">
        <div className = "key">When:</div>
        <div className = "value">7:30 PM</div>
      </div>

      <div className = "property">
        <div className = "key">People:</div>
        <div className = "value">1+ (currently 3)</div>
      </div>

      <div className = "see-details">See Details</div>
    </div>


    <div className = "event-container">

      <div className = "title">Shopping</div>
      <div className = "distance">5.8 miles away</div>

      <div className = "property">
        <div className = "key">Host:</div>
        <div className = "value">
          Megan J. <span className = "secondary-text">Female, age 18-30</span>
        </div>
      </div>

      <div className = "property">
        <div className = "key">Meet at:</div>
        <div className = "value">
          Junction Mall food court
        </div>
      </div>

      <div className = "property">
        <div className = "key">When:</div>
        <div className = "value">6:00 PM</div>
      </div>

      <div className = "property">
        <div className = "key">People:</div>
        <div className = "value">2-3 (currently 1)</div>
      </div>

      <div className = "see-details">See Details</div>
    </div>
  </div>
);

  export default SampleEvents;
