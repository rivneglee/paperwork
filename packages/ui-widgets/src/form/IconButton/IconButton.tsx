import React, { FunctionComponent, SyntheticEvent } from 'react';
import classNames from 'classnames';

import { Avater } from '../../graphic/Avater';

interface Props {
  size?: 'small' | 'medium' | 'large';
  shadow?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  className?: string;
}

const IconButton: FunctionComponent<Props> = ({
  size = 'medium',
  onClick,
  children,
  shadow = false,
  className = false,
}) => (
  <span onClick={onClick}>
    <Avater
      className={classNames('pw-icon-button', className)}
      size={size}
      shadow={shadow}
    >
      {children}
    </Avater>
  </span>
);

export default IconButton;
