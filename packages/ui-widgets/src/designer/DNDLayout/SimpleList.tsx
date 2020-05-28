import React, { ComponentType, FunctionComponent } from 'react';

import DraggableList from './DraggableList';
import { DragAndDropType, Item, Layout, LayoutLinkedNode } from './types';
import ItemWrapper from './ItemWrapper';
import Placeholder from './Placeholder';

interface Props {
  id: string;
  layout: Layout;
  dragAndDropDisabled?: boolean;
  readonly?: boolean;
  itemComponentMap: {[key: string]: ComponentType<Item>};
  items: {[key:string]: Item};
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onRemove?:() => void;
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
}) => {
  const renderItem = (layoutNode: LayoutLinkedNode) => {
    const item = items[layoutNode.id];
    if (item) {
      const { id, itemType, ...otherProps } = item;
      const Item = itemComponentMap[itemType];
      if (Item) {
        return (
          <ItemWrapper
            id={id}
            dragAndDropDisabled={dragAndDropDisabled}
            onEdit={onEditItem}
            onRemove={onRemoveItem}
            onDuplicate={onDuplicateItem}
          >
            <Item
              id={id}
              itemType={itemType}
              disabled={readonly}
              {...otherProps}
            />
          </ItemWrapper>
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
