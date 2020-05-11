import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export type RowComponent = FunctionComponent<Props>;

const Row: RowComponent = ({ children, className }) => (
  <div className={classNames('pw-table__row', className)}>
    {children}
  </div>
);

export default Row;
