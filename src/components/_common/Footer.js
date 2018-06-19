import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className = "footer">
    {/* copyright symbol */}
    <span>
      &#169;
      {`Doug Sauve ${new Date().getFullYear()}`}
    </span>
  </div>
)

export { Footer as default };
