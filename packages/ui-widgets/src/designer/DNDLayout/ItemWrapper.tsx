import React, { FunctionComponent } from 'react';

import Tooltip from '../../message/Tooltip/Tooltip';
import Icons from '../../graphic/Icons';
import { IconButton } from '../../form/IconButton';

interface Props {
  id: string;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onRemove?: (id: string) => void;
  dragAndDropDisabled?: boolean;
}

const ItemWrapper: FunctionComponent<Props> = ({
  id,
  children,
  dragAndDropDisabled,
  onEdit,
  onDuplicate,
  onRemove,
}) => {
  if (dragAndDropDisabled) return <>{children}</>;
  return (
    <Tooltip content={
      <div className="pw-dnd-item-wrapper">
        <IconButton onClick={() => onEdit && onEdit(id)} className="pw-dnd-item-wrapper__button">
          <Icons.Settings />
          <span>Settings</span>
        </IconButton>
        <IconButton onClick={() => onDuplicate && onDuplicate(id)} className="pw-dnd-item-wrapper__button">
          <Icons.Duplicate />
          <span>Duplicate</span>
        </IconButton>
        <IconButton onClick={() => onRemove && onRemove(id)} className="pw-dnd-item-wrapper__button">
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
