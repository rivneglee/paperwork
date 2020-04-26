import React, { FunctionComponent, ReactElement } from 'react';
import { Card } from '../../layout/Card';
import { Scrollable } from '../../layout/Scrollable';

interface Props {
  header?: ReactElement;
  footer?: ReactElement;
  subHeader?: ReactElement;
  subFooter?: ReactElement;
}

const BaseTemplate: FunctionComponent<Props> = ({
  header,
  footer,
  subHeader,
  subFooter,
  children,
}) => (
  <div className="pw-template">
    {header && (
      <div className="pw-template__header">
        {header}
      </div>
    )}
    <div className="pw-template__scrollwrapper">
      <Scrollable>
        <div className="pw-template__content">
          <Card className="pw-template__inner" header={subHeader} footer={subFooter}>
            {children}
          </Card>
        </div>
      </Scrollable>
    </div>
    {footer && (
      <div className="pw-template__footer">
        {footer}
      </div>
    )}
  </div>
);

export default BaseTemplate;
