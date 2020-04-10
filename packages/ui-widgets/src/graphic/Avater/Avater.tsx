import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  shadow?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avater: FunctionComponent<Props> = ({
  children,
  className = '',
  size = 'medium',
  shadow = false,
}) => (
  <div className={
    classNames('pw-avater', `pw-avater--${size}`, className, {
      ['pw-avater--shadow']: shadow,
    })
  }>
    {children}
  </div>
);

export default Avater;
