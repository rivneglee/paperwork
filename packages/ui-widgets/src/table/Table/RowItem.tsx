import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  columnName?: string;
  className?: string;
  style?: any;
  hideLabel?: boolean;
}

export type RowItemComponent = FunctionComponent<Props>;

const RowItem: RowItemComponent = ({ children, columnName, className, style = {}, hideLabel }) => {
  const { width } = style;
  const styleOverrides = width ? { ...style, flex: 'none' } : style;
  return (
    <div className={classNames(
      'pw-table__item',
      className,
      hideLabel && 'pw-table__item--hide-label',
    )} data-label={columnName} style={styleOverrides}>
      {children}
    </div>
  );
}

export default RowItem;
