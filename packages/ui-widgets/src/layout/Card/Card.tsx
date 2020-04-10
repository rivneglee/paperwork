import React, { ReactComponentElement, FunctionComponent } from 'react';

interface Props {
  children: ReactComponentElement<any> | string;
  header?: ReactComponentElement<any> | string;
  footer?: ReactComponentElement<any> | string;
}

const Card: FunctionComponent<Props> = ({
 children, header, footer,
}) => (
  <div className="pw-card">
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
      header && (
        <div className="pw-card__footer">
          {footer}
        </div>
      )
    }
  </div>
);

export default Card;
