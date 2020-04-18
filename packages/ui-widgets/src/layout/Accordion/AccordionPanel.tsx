import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import { IconButton } from '../../form/IconButton';
import Icons from '../../graphic/Icons';

interface Props {
  className?: string;
  header?: ReactElement | string;
}

export interface AccordionPanelComponent extends FunctionComponent<Props> {}

const AccordionPanel: AccordionPanelComponent = ({
  children,
  header,
  className = '',
}) => {
  const stopEvent = (e: SyntheticEvent) => e.stopPropagation();
  return (
    <div className={`pw-accordion-panel ${className}`}>
      <div className="pw-accordion-panel__header">
        <div className="pw-accordion-panel__summary" onClick={stopEvent}>
          {header}
        </div>
        <IconButton className="pw-accordion-panel__icon">
          <Icons.ArrowDown />
        </IconButton>
      </div>
      <div className="pw-accordion-panel__body" onClick={stopEvent}>
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
