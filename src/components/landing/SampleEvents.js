import React from 'react';

import './SampleEvents.scss';

const SampleEvents = () => (
  <div className = "landing__sample-events">

    <div className = "sample__event">

      <div className = "sample__title">Shooting Hoops</div>
      <div className = "sample__distance">1.3 miles away</div>

      <div className = "sample__property">
        <div className = "sample__key">Host:</div>
        <div className = "sample__value">
          Adil A. <span className = "sample__secondary-text">Male, age 30-45</span>
        </div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">Meet at:</div>
        <div className = "sample__value">
          Cypress Hill Park basketball courts
        </div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">When:</div>
        <div className = "sample__value">7:30 PM</div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">People:</div>
        <div className = "sample__value">1+ (currently 3)</div>
      </div>

      <div className = "sample__see-details">See Details</div>
    </div>


    <div className = "sample__event">

      <div className = "sample__title">Shopping</div>
      <div className = "sample__distance">5.8 miles away</div>

      <div className = "sample__property">
        <div className = "sample__key">Host:</div>
        <div className = "sample__value">
          Megan J. <span className = "sample__secondary-text">Female, age 18-30</span>
        </div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">Meet at:</div>
        <div className = "sample__value">
          Junction Mall food court
        </div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">When:</div>
        <div className = "sample__value">6:00 PM</div>
      </div>

      <div className = "sample__property">
        <div className = "sample__key">People:</div>
        <div className = "sample__value">2-3 (currently 1)</div>
      </div>

      <div className = "sample__see-details">See Details</div>
    </div>
  </div>
);

  export default SampleEvents;
