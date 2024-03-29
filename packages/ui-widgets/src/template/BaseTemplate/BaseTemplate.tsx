import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { Scrollable } from '../../layout/Scrollable';

interface Props {
  header?: ReactElement;
  footer?: ReactElement;
  setScrollerRef?: (ref: any) => void;
  spinner?: ReactElement | null;
  isProcessing?: boolean;
  className?: string;
}

const BaseTemplate: FunctionComponent<Props> = ({
  header,
  footer,
  children,
  setScrollerRef,
  spinner,
  isProcessing,
  className,
}) =>  (
  <div className={classNames('pw-template', className)}>
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
            {isProcessing && spinner}
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
