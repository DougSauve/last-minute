import React from 'react';

import './_Modal.scss';

class Modal extends React.Component {

  state = {
    loaded: false,
    styling: {},
  }

  componentDidMount() {

    let styling = {};

    if (this.props.deviceType === 'mobile') {
      if (this.props.keepSize) {
          styling = {
            top: '10vh',
            maxWidth: '96vw',
          };
      } else {
        styling = {
          top: '2vh',
          bottom: '2vh',
          maxWidth: '96vw',
        };
      };
    };

    this.setState(() => ({
      styling,
      loaded: true,
    }));

    document.body.style.overflow = "hidden";
  };

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  };

  render() {
    return (
      // props: {
      //   close: (function)
      //   children (children)
      //   style (styles)
      //   classNames {classes to add}
      // };
    <div
      id = "modal-container"
      className = "modal-container"
    >
      <div className = "backdrop"
        onClick = {this.props.close}
      />

      {(this.state.loaded) &&
        <div
          className = {(this.props.classNames) ? this.props.classNames + " modal" : "modal"}
          style = {this.state.styling}
          >
            {this.props.children}
          </div>
      }
    </div>
    );
  };
};

export { Modal as default };
