import React, { FunctionComponent } from 'react';

interface Props {
}

export type HeaderItemComponent = FunctionComponent<Props>;

const HeaderItem: HeaderItemComponent = ({ children }) => (
  <div className="pw-table__item">
    {children}
  </div>
);

export default HeaderItem;
