import React from 'react';
import './EditHomeLocation.scss';

const EditHomeLocation = (props) => (
  // props: {
    //  currentHomeLocation = {this.props.user.currentHomeLocation}
    // homeLocations = {this.props.user.homeLocations}
    // setShowAddHomeLocationModal = {this.setShowAddHomeLocationModal}
    // deleteHomeLocation = {this.deleteHomeLocation}
    // complete = (boolean) whether to show add and delete options
  // };
  <div className = {(props.deviceType === 'mobile') ? "" : "quarter-width-box set-right"}>
    <div className = {(props.deviceType === 'mobile') ? "" : "modal-item-container center"}>

      <div className = {(props.deviceType === 'mobile') ? "title half-rem-above text-center" : "title half-rem-below text-center"}>{(props.homeLocations.length > 1) ? 'Home Locations:' : 'Home Location:'}</div>

      <div className = "center">
        {props.homeLocations.map((homeLocation, index) => {
          return(
            <div
              className = "center home-location-box"
              key = {index}
            >

              {(JSON.stringify(homeLocation._id) === JSON.stringify(props.currentHomeLocation._id)) ?
                //active homeLocation
              <div className = "home-location outlined--accent width100_percent row--align-left center-vertically">
                <div
                  className = "button--round no-hover background-blue border-blue space-after unsquishable"
                >
                  &#10003;
                </div>

                <span className = "break-word">{homeLocation.name}</span>

              </div> :

                //inactive homeLocation
              <div className = "home-location outlined width100_percent row--align-left center-vertically">
                <div
                  className = "button--round background-none border-grey space-after unsquishable"
                  onClick = {props.switchHomeLocation.bind(this, homeLocation)}
                />

                <span>{homeLocation.name}</span>

                <div className = "flex-spacer" />

                {props.complete &&
                  <div
                    className = "remove-homeLocation-button unsquishable"
                    onClick = {props.deleteHomeLocation.bind(this, homeLocation)}
                  >
                    x
                  </div>
                }

              </div>
              }

            </div>
          );
        })}

        {/* add homeLocation button */}
        {props.complete &&
          <div className = "width100_percent row center-vertically add-home-location-pl">
            <div
              className = "button--round background-blue border-blue half-rem-before"
              onClick = {() => {
                props.setShowAddHomeLocationModal(false);
                props.setShowAddHomeLocationModal(true);
              }}
            >
              +
            </div>
            <span className = "half-rem-before secondary-text italic">add a location</span>
          </div>
        }
      </div>
    </div>
  </div>
);

export default EditHomeLocation;
