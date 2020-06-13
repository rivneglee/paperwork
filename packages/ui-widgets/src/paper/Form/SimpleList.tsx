import React, { FunctionComponent } from 'react';

import DraggableList from './DraggableList';
import { DragAndDropType, FormMode, Item, ItemMetadata, Items, Layout, LayoutLinkedNode } from './types';
import LayoutItem from './LayoutItem';
import Placeholder from './Placeholder';

interface Props {
  id: string;
  layout: Layout;
  mode: FormMode;
  itemMetadataMap: {[itemType: string]: ItemMetadata};
  items: Items;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onRemove?:() => void;
  onItemPropsChange?: (newItem: Item) => void;
  direction?: 'horizontal' | 'vertical';
}

const SimpleList: FunctionComponent<Props> = ({
  id,
  direction,
  layout,
  mode,
  itemMetadataMap,
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
      const metadata = itemMetadataMap[itemType];
      if (metadata) {
        return (
          <LayoutItem
            item={item}
            mode={mode}
            metadata={metadata}
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
      direction={direction}
      renderItem={renderItem}
      dragAndDropType={DragAndDropType.ITEM}
      layout={layout}
      disabled={mode !== FormMode.DESIGN}
      placeholder={<Placeholder message="DROP ITEM HERE" onRemove={onRemove}/>}
    />
  );
};

export default SimpleList;
