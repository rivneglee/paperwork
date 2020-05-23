import React, { FunctionComponent, ReactElement } from 'react';
import { Scrollable } from '../../layout/Scrollable';

interface Props {
  header?: ReactElement;
  footer?: ReactElement;
  setScrollerRef?: (ref: any) => void;
}

const BaseTemplate: FunctionComponent<Props> = ({
  header,
  footer,
  children,
  setScrollerRef,
}) => (
  <div className="pw-template">
    {header && (
      <div className="pw-template__header">
        {header}
      </div>
    )}
    <div className="pw-template__scrollwrapper">
      <Scrollable className="pw-template__scroller" setRef={setScrollerRef}>
        <div className="pw-template__content">
          <div className="pw-template__inner">
            {children}
          </div>
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
