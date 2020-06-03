import React, { FunctionComponent } from 'react';
import { IconButton } from '../IconButton';

interface Props {
  label?: string;
}

export type LaunchPadItemComponent = FunctionComponent<Props>;

const LaunchPadItem: LaunchPadItemComponent = ({
  label,
  children,
}) => (
  <div className="pw-launchpad-item">
    <IconButton className="pw-launchpad-item__button">
      {children}
    </IconButton>
    <span className="pw-launchpad-item__label">{label}</span>
  </div>
);

export default LaunchPadItem;
