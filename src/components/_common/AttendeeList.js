import React from 'react';

import makeAgeRangeUserFriendly from '../../../utils/makeAgeRangeUserFriendly';

class AttendeeList extends React.Component {

  state = {
    showList: false
  };

  setShowList = (value) => {
    this.setState(() => ({ showList: value }));
  };

  render() {
    return (
      <div>

        <div>
          {(this.state.showList) ?
          <div
            className = "link"
            onClick = {this.setShowList.bind(this, false)}
          >
            hide list
          </div>  :
          <div
            className = "link"
            onClick = {this.setShowList.bind(this, true)}
          >
            show list
          </div>
          }
        </div>

        <div>
          {this.state.showList &&
            this.props.event.attendees.map((attendee, index)=> {
              return (
                <div
                  key = {index}
                  className = "secondary-text"
                >
                  {(this.props.showNames) && <span>{attendee.name}, </span>}
                  {attendee.gender}, {makeAgeRangeUserFriendly(attendee.ageRange)} {'  '}
                </div>
              )
            })
          }
        </div>

      </div>
    );
  };
};

export {AttendeeList as default};
