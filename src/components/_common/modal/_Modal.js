import React from 'react';

import './_Modal.scss';

const Modal = (props) => (
<div>
  <div className = "backdrop" />

  <div className = "modal">
    {props.children}
  </div>
</div>
);

export { Modal as default };
