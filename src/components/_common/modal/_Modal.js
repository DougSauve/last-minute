import React from 'react';

import './_Modal.scss';

const Modal = (props) => (
  // props: {
  //   close: (function)
  //   children (children)
  // };
<div className = "modal-container">
  <div className = "backdrop"
    onClick = {props.close}
  />

  <div className = "modal">
    {props.children}
  </div>
</div>
);

export { Modal as default };
