import React, { FunctionComponent } from 'react';

import Tooltip from '../../message/Tooltip/Tooltip';
import Icons from '../../graphic/Icons';
import { IconButton } from '../../form/IconButton';

interface Props {
  dragAndDropDisabled?: boolean;
}

const ItemWrapper: FunctionComponent<Props> = ({
  children,
  dragAndDropDisabled,
}) => {
  if (dragAndDropDisabled) return <>{children}</>;
  return (
    <Tooltip content={
      <div className="pw-dnd-item-wrapper">
        <IconButton className="pw-dnd-item-wrapper__button">
          <Icons.Settings />
          <span>Settings</span>
        </IconButton>
        <IconButton className="pw-dnd-item-wrapper__button">
          <Icons.Duplicate />
          <span>Duplicate</span>
        </IconButton>
        <IconButton className="pw-dnd-item-wrapper__button">
          <Icons.Trash />
          <span>Remove</span>
        </IconButton>
      </div>
    } placement="top">
      <div className="pw-dnd-item-wrapper__item">
        {children}
      </div>
    </Tooltip>
  );
};

export default ItemWrapper;
