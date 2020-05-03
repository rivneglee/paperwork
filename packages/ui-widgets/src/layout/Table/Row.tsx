import React, { FunctionComponent } from 'react';

interface Props {}

export type RowComponent = FunctionComponent<Props>;

const Row: RowComponent = ({ children }) => (
  <div className="pw-table__row">
    {children}
  </div>
);

export default Row;
