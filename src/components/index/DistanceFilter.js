import React from 'react';
import './DistanceFilter.scss';

const DistanceFilter = (props) => (
  // props: {
  //   distance = {this.props.distance}
  //   units = {this.props.units}
  //   setSearchPreferences = {this.setSearchPreferences}
  //   distanceError = {this.props.distanceError}
  // };

  <div className = "quarter-width-box set-left">
    <div className = "modal-item-container center">
      <div className = "half-rem-below">
        Show events within
      </div>

      <form className = "searchPreferences center">

        <div className = "row">
          <input
            className = "input width5 space-after"
            type = "number"
            name = "distance"
            defaultValue = {props.distance}
          />

          <select
            className = "input width7"
            name = "units"
          >
            <option value = {props.units}>
              {props.units}
            </option>
            {(props.units !== 'km') && <option value = "km">km</option>}
            {(props.units !== 'miles') && <option value = "miles">Miles</option>}
          </select>
        </div>

        <span className = "error">{props.distanceError}</span>

        <div
          className = "button background-blue width100_percent"
          onClick = {props.setSearchPreferences}
        >
          Search
        </div>

      </form>
    </div>
  </div>
);

export default DistanceFilter;
