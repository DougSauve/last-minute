import React from 'react';

import './_Modal.scss';

class Modal extends React.Component {

  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  componentDidMount() {
    window.addEventListener('scroll', this.disableScroll);
  };

  disableScroll = () => {
    console.log('scrolling');
    document.documentElement.scrollTop = this.scrollTop;
    document.body.scrollTop = this.scrollTop;
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.disableScroll);
  };

  render() {
    return (
      // props: {
      //   close: (function)
      //   children (children)
      // };
    <div className = "modal-container">
      <div className = "backdrop"
        onClick = {this.props.close}
      />

      <div className = "modal">
        {this.props.children}
      </div>
    </div>
    );
  };
};

export { Modal as default };
