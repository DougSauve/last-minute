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
  <div className = "quarter-width-box set-right">
    <div className = "modal-item-container center">
      {
      (props.homeLocations.length > 1) ?
      <div className = "title half-rem-below">Home Locations:</div> :
      <div className = "title half-rem-below">Home Location:</div>
      }

      <div>
        {props.homeLocations.map((homeLocation, index) => {
          return(
            <div
              className = "center"
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

                <span>{homeLocation.name}</span>

              </div> :

                //inactive homeLocation
              <div className = "home-location outlined width100_percent row--align-left center-vertically">
                <div
                  className = "button--round background-none border-grey space-after unsquishable"
                  onClick = {props.switchHomeLocation.bind(this, homeLocation)}
                />

                <span>{homeLocation.name}</span>

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
          <div className = "width100_percent row center-vertically">
            <div
              className = "button--round background-blue border-blue half-rem-before"
              onClick = {props.setShowAddHomeLocationModal.bind(this, true)}
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
