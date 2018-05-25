import React from 'react';

import './_Index.scss';

import TitleBar from '../_common/TitleBar';
import EventsList from '../_common/EventsList';
import Footer from '../_common/Footer';

import LinkButtonContainer from './LinkButtonContainer';


// The index page shows a list of all open events within 10mi (can be changed). The user can respond to these by joining an event or by adding a question/comment. They can also flag open events or comments.
// It also shows a link to the profile and events pages.

class Index extends React.Component {

  render() {
    return(
      <div className = "index">

        <LinkButtonContainer />

        <TitleBar
          title = "Open Events"
          titleClass = "index__title"
          logout = {true}
        />

        <EventsList
          firstWordOfClass = "index"
        />

        <Footer />

      </div>
    );
  };
};

export { Index as default };
