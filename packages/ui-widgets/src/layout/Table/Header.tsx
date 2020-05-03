import React, { FunctionComponent } from 'react';

interface Props {}

export type HeaderComponent = FunctionComponent<Props>;

const Header: HeaderComponent = ({ children }) => (
  <div className="pw-table__header">
    <div className="pw-table__row">
      {children}
    </div>
  </div>
);

export default Header;
