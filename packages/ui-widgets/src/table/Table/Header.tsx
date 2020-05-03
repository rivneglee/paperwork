import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

interface Props {
  className?: string;
}

export type HeaderComponent = FunctionComponent<Props>;

const Header: HeaderComponent = ({ children, className }) => (
  <div className={classNames('pw-table__header', className)}>
    <div className="pw-table__row">
      {children}
    </div>
  </div>
);

export default Header;
