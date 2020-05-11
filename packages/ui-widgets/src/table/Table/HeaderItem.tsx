import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

interface Props {
  className?: string;
  style?: any;
  hideLabel?: boolean;
}

export type HeaderItemComponent = FunctionComponent<Props>;

const HeaderItem: HeaderItemComponent = ({ children, className, hideLabel, style = {} }) => {
  const { width } = style;
  const styleOverrides = width ? { ...style, flex: 'none' } : style;
  return (
    <div className={classNames(
      'pw-table__item',
      className,
    )} style={styleOverrides}>
      {!hideLabel && children}
    </div>
  );
};

export default HeaderItem;
