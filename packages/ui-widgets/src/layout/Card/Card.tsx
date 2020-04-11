import React, { ReactComponentElement, FunctionComponent } from 'react';

interface Props {
  header?: ReactComponentElement<any> | string;
  footer?: ReactComponentElement<any> | string;
  className?: string;
}

const Card: FunctionComponent<Props> = ({
 children, header, footer, className = '',
}) => (
  <div className={`pw-card ${className}`}>
    {
      header && (
        <div className="pw-card__header">
          {header}
        </div>
      )
    }
    <div className="pw-card__body">
      {children}
    </div>
    {
      footer && (
        <div className="pw-card__footer">
          {footer}
        </div>
      )
    }
  </div>
);

export default Card;
