import React, { ReactComponentElement, SyntheticEvent, FunctionComponent } from 'react';
import { Avater } from '../../graphic/Avater';
import { Tooltip } from '../../message/Tooltip';

interface Props {
  icon: ReactComponentElement<any>;
  tooltip?: string;
  onClick?: (e: SyntheticEvent) => void;
}

const QuickAddItem: FunctionComponent<Props> = ({ onClick, icon, tooltip }) => {
  const avater = (
    <Avater size="medium">
      {icon}
    </Avater>
  );
  const innerView = tooltip ? (
    <Tooltip placement="right" content={tooltip}>
      {avater}
    </Tooltip>
  ) : avater;

  return (
    <div className="pw-quickadd-item" onClick={onClick}>
      {innerView}
    </div>
  );
};

export default QuickAddItem;

export type QuickAddItemComponent = FunctionComponent<Props>;
