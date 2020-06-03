import React, { FunctionComponent } from 'react';

import Tooltip from '../../message/Tooltip/Tooltip';
import Icons from '../../graphic/Icons';
import { IconButton } from '../../form/IconButton';
import { Item, ItemMetadata } from './types';

interface Props {
  item: Item;
  metadata: ItemMetadata;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onRemove?: (id: string) => void;
  dragAndDropDisabled?: boolean;
  readonly?: boolean;
}

const handleAction = (id: string, handler?: (id: string) => void) => () => {
  handler && handler(id);
};

const LayoutItem: FunctionComponent<Props> = ({
  item,
  metadata,
  readonly,
  children,
  dragAndDropDisabled,
  onEdit,
  onDuplicate,
  onRemove,
}) => {
  const { id, itemType, ...otherProps } = item;
  const { MainView, SettingsView } = metadata;
  const itemView = (
    <MainView
      id={id}
      itemType={itemType}
      disabled={readonly}
      {...otherProps}
    />
  );

  if (dragAndDropDisabled) return itemView;
  return (
    <Tooltip content={
      <div className="pw-dnd-item-wrapper">
        {
          SettingsView && (
            <IconButton onClick={handleAction(id, onEdit)} className="pw-dnd-item-wrapper__button">
              <Icons.Settings />
              <span>Settings</span>
            </IconButton>
          )
        }
        <IconButton onClick={handleAction(id, onDuplicate)} className="pw-dnd-item-wrapper__button">
          <Icons.Duplicate />
          <span>Duplicate</span>
        </IconButton>
        <IconButton onClick={handleAction(id, onRemove)} className="pw-dnd-item-wrapper__button">
          <Icons.Trash />
          <span>Remove</span>
        </IconButton>
      </div>
    } placement="top">
      <div className="pw-dnd-item-wrapper__item">
        {itemView}
      </div>
    </Tooltip>
  );
};

export default LayoutItem;
