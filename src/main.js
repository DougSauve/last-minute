import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';


import './base-styles/_Hub.scss';

// import Maintenance from './components/maintenance/maintenance';
import NotFound from './components/notFound/notFound';
import createStore, { setSocket } from './redux/store';
const store = createStore();

const socket = io();
store.dispatch(setSocket(socket));

import Landing from './components/landing/_Landing';
import Index from './components/index/_Index';
import Profile from './components/profile/_Profile';
import Events from './components/events/_Events';

// import Slide3 from './components/events/manageEventModal/eventsForm/Slide3';


//router
const Router = () => {
    switch (window.location.pathname) {
      case '/': return <Landing socket = {socket} />;
      case '/index': return <Index socket = {socket} />;
      case '/profile': return <Profile socket = {socket} />;
      case '/events': return <Events socket = {socket} />;
      default:
      return <NotFound />;
  };
};

const WrappedApp = () => (
  <div>
    <Provider store = {store} >
    <Router />
  </Provider>
</div>
);

ReactDOM.render(<WrappedApp />, document.getElementById('app'));

export { store };
