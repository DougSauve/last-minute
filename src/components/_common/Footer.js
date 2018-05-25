import React from 'react';

const Footer = () => (
  <div className = "footer">
    {/* copyright symbol */}
    &#169;
    {`Doug Sauve ${new Date().getFullYear()}`}
  </div>
)

export { Footer as default };
