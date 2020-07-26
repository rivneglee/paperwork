import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  onClick?: () => void;
}

export type RowComponent = FunctionComponent<Props>;

const Row: RowComponent = ({ children, className, onClick }) => (
  <div onClick={onClick} className={classNames('pw-table__row', className)}>
    {children}
  </div>
);

export default Row;
