import React, { FunctionComponent } from 'react';

import './StickySideBar.scss';

const StickySideBar: FunctionComponent = ({ children }) => (
  <div className="pwapp-sticky-sidebar">
    { children }
  </div>
);

export default StickySideBar;
