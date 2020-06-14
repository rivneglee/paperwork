import React, { FunctionComponent } from 'react';
import { IconButton } from '../IconButton';
import classNames from 'classnames';

interface Props {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export type LaunchPadItemComponent = FunctionComponent<Props>;

const LaunchPadItem: LaunchPadItemComponent = ({
  label,
  children,
  className,
  onClick,
}) => (
  <div className={classNames('pw-launchpad-item', className)} onClick={onClick}>
    <IconButton className="pw-launchpad-item__button">
      {children}
    </IconButton>
    <span className="pw-launchpad-item__label">{label}</span>
  </div>
);

export default LaunchPadItem;
