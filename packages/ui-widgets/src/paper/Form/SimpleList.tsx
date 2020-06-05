import React, { FunctionComponent } from 'react';

import DraggableList from './DraggableList';
import {DragAndDropType, Items, ItemMetadata, Layout, LayoutLinkedNode, Item} from './types';
import LayoutItem from './LayoutItem';
import Placeholder from './Placeholder';

interface Props {
  id: string;
  layout: Layout;
  dragAndDropDisabled?: boolean;
  readonly?: boolean;
  itemComponentMap: {[itemType: string]: ItemMetadata};
  items: Items;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onRemove?:() => void;
  onItemPropsChange?: (newItem: Item) => void;
}

const SimpleList: FunctionComponent<Props> = ({
  id,
  layout,
  dragAndDropDisabled,
  readonly,
  itemComponentMap,
  items,
  onRemoveItem,
  onDuplicateItem,
  onEditItem,
  onRemove,
  onItemPropsChange,
}) => {
  const renderItem = (layoutNode: LayoutLinkedNode) => {
    const item = items[layoutNode.id];
    if (item) {
      const { itemType } = item;
      const metadata = itemComponentMap[itemType];
      if (metadata) {
        return (
          <LayoutItem
            item={item}
            readonly={readonly}
            metadata={metadata}
            dragAndDropDisabled={dragAndDropDisabled}
            onEdit={onEditItem}
            onRemove={onRemoveItem}
            onDuplicate={onDuplicateItem}
            onChange={value => onItemPropsChange && onItemPropsChange({ ...item, value })}
          />
        );
        return <span>{`Unknown item type: ${itemType}`}</span>;
      }
    }
    return <span>{`item ${layoutNode.id} is not found`}</span>;
  };
  return (
    <DraggableList
      id={id}
      renderItem={renderItem}
      dragAndDropType={DragAndDropType.ITEM}
      layout={layout}
      disabled={dragAndDropDisabled}
      placeholder={<Placeholder message="DROP ITEM HERE" onRemove={onRemove}/>}
    />
  );
};

export default SimpleList;
