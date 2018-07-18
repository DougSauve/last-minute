import React from 'react';
import './Logout.scss';

import { connect } from 'react-redux';
import { setMyEvent } from '../../redux/myEvent';
import { setUser } from '../../redux/user';

const Logout = (props) => (
  <div
    className = "log-out bar-link"
    onClick = {() => {
      props.socket.emit('setMyEvent', null);
      props.socket.emit('setCurrentUser', null, () => {
        window.location.pathname = '/';
      });

    }}
  >
      Log Out
  </div>
);

const mapStateToProps = (reduxStore) => ({
  socket: reduxStore.socketReducer.socket,
});

const mapDispatchToProps = {
  setMyEvent,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
