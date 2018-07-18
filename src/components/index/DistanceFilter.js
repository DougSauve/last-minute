import React from 'react';
import './DistanceFilter.scss';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class DistanceFilter extends React.Component {

  componentDidMount() {
    if (!this.props.areModalsOpen()) {
      document.onkeydown = handleKeyboardEvents.bind(this, ['enter', this.props.setSearchPreferences]);
    };
  };

  componentDidUpdate() {
    if (!this.props.areModalsOpen()) {
      document.onkeydown = handleKeyboardEvents.bind(this, ['enter', this.props.setSearchPreferences]);
    };
  };

  render() {
    return (
      // props: {
      //   distance = {this.props.distance}
      //   units = {this.props.units}
      //   setSearchPreferences = {this.setSearchPreferences}
      //   distanceError = {this.props.distanceError}
      //   deviceType = {this.props.deviceType}
      // };

      <div className = {(this.props.deviceType === 'mobile') ? "" : "quarter-width-box set-left"}>
        <div className = "center title show-pl">Show events within:</div>

        <div className = {(this.props.deviceType === 'mobile') ? "distance-filter-layout-pl outlined--accent" : "modal-item-container center"}>
          <div className = "half-rem-below show-d">
            Show events within
          </div>

          <form
            action = "javascript:void(0);"
            className = "searchPreferences center"
          >
            <div className = "row width100_percent">
              <input
                className = "input width50_percent space-after"
                type = "number"
                name = "distance"
                defaultValue = {this.props.distance}
              />

              <select
                className = "input width50_percent"
                name = "units"
              >
                <option value = {this.props.units}>
                  {this.props.units}
                </option>
                {(this.props.units !== 'km') && <option value = "km">km</option>}
                {(this.props.units !== 'miles') && <option value = "miles">Miles</option>}
              </select>
            </div>

            <span className = "error">{this.props.distanceError}</span>
          </form>

          <div
            className = "button background-blue width100_percent"
            onClick = {this.props.setSearchPreferences}
          >
            Search
          </div>

        </div>
      </div>
    );
  };
};

export default DistanceFilter;
