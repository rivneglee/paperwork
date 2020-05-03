import React, { FunctionComponent } from 'react';

interface Props {
  columnName: string;
}

export type RowItemComponent = FunctionComponent<Props>;

const RowItem: RowItemComponent = ({ children, columnName }) => (
  <div className="pw-table__item" data-label={columnName}>
    {children}
  </div>
);

export default RowItem;
