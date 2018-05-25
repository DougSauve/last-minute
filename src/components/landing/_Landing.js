import React from 'react';

import TitleBar from '../_common/TitleBar';
import EventsList from '../_common/EventsList';
import Footer from '../_common/Footer';

import EntryButtonContainer from './components/EntryButtonContainer';

// this page greets users and provides a list of current local events.
// it also show a button for 'sign up' and one for 'log in'. These drop down into forms. (maybe - this might be pretty fancy animation.)

const Landing = () => (
  <div className = "landing">

    <TitleBar
      showLogin = {true}
    />
    <EntryButtonContainer />
    <EventsList
      firstWordOfClass = "landing"
      limited = {true}
    />
    <Footer />

  </div>
);

export { Landing as default };
