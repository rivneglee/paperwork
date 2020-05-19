import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  icon?: ReactElement;
  primary?: ReactElement | string;
  secondary?: ReactElement | string;
  className?: string;
}

export type CardHeaderComponent = FunctionComponent<Props>;

const CardHeader: CardHeaderComponent = ({
 children, primary, secondary, icon, className = '',
}) => (
  <div className={`pw-card-header ${className}`}>
    <span className="pw-card-header__icon">{icon}</span>
    <h3 className="pw-card-header__primary">
      {primary}
    </h3>
    <div className="pw-card-header__secondary">
      {secondary}
    </div>
  </div>
);

export default CardHeader;
