import React, { FunctionComponent } from 'react';

import Tooltip from '../../message/Tooltip/Tooltip';
import Icons from '../../graphic/Icons';
import { IconButton } from '../../form/IconButton';
import { FormMode, Item, ItemMetadata } from './types';

interface Props {
  item: Item;
  metadata: ItemMetadata;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onChange?: (value: any) => void;
  onRemove?: (id: string) => void;
  mode: FormMode;
}

const handleAction = (id: string, handler?: (id: string) => void) => () => {
  handler && handler(id);
};

const LayoutItem: FunctionComponent<Props> = ({
  item,
  metadata,
  children,
  onEdit,
  onDuplicate,
  onRemove,
  onChange,
  mode,
}) => {
  const { id, itemType, ...otherProps } = item;
  const { MainView, SettingsView, defaultProps = {} } = metadata;
  const itemView = (
    <MainView
      {...defaultProps}
      id={id}
      itemType={itemType}
      mode={mode}
      onChange={onChange}
      {...otherProps}
    />
  );

  if (mode !== FormMode.DESIGN) return itemView;
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
