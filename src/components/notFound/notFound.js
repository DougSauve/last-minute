import React from 'react';

import './_NotFound.scss';

export default class NotFound extends React.Component {

  sendTo(destination) {
    window.location.pathname = '/';
  };

  render() {
    return (
        <div className = "not-found-redirect" onClick = {this.sendTo.bind(this, '/')}>
        <h4 className = "not-found">
           That page doesn't exist. Click anywhere to be redirected to the main page.
        </h4>
      </div>
    )
  }
}
