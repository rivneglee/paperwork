import React, { FunctionComponent, ComponentType, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import DraggableList from './DraggableList';
import { DragAndDropType, Items, ItemMetadata, Layout, LayoutLinkedNode, LayoutNodeTypes } from './types';
import SimpleList from './SimpleList';
import Placeholder from './Placeholder';
import { Scrollable } from '../../layout/Scrollable';
import { Drawer } from '../../layout/Drawer';

interface Props {
  id: string;
  layout: Layout;
  items: Items;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  onDragEnd?: (result: DropResult) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
  dragAndDropDisabled?: boolean;
  readonly?: boolean;
}

const defaultLayoutComponentMap = {
  [LayoutNodeTypes.SIMPLE_LIST]: SimpleList,
};

const Page: FunctionComponent<Props> = ({
  id,
  layout,
  items,
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap,
  onDragEnd,
  onRemoveItem,
  onDuplicateItem,
  onRemoveLayout,
  dragAndDropDisabled,
  readonly,
}) => {
  const onEditItem = (id: string) => setEditingItemId(id)
  const [editingItemId, setEditingItemId] = useState('');
  const editingItem = items[editingItemId];

  let SettingsView = null;
  if (editingItem) {
    const itemMetadata = itemComponentMap[editingItem.itemType];
    SettingsView = itemMetadata.SettingsView;
  }

  const renderItem = (layoutNode: LayoutLinkedNode) => {
    if (layoutNode.childRefs.length === 0 && dragAndDropDisabled) return null;
    const Layout = layoutComponentMap[layoutNode.type];
    if (Layout) {
      return (
        <div className="pw-dnd-layout-page__layout">
          <Layout
            id={layoutNode.id}
            layout={layout}
            dragAndDropDisabled={dragAndDropDisabled}
            readonly={readonly}
            items={items}
            itemComponentMap={itemComponentMap}
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onDuplicateItem={onDuplicateItem}
            onRemove={() => onRemoveLayout && onRemoveLayout(layoutNode.id)}
          />
        </div>
      );
    }
    return <span>{`Unknown layout node type: ${layoutNode.type}`}</span>;
  };

  return (
    <>
      <DraggableList
        id={id}
        renderItem={renderItem}
        layout={layout}
        dragAndDropType={DragAndDropType.LAYOUT}
        disabled={dragAndDropDisabled}
        onDragEnd={onDragEnd}
        placeholder={
          <Placeholder className="pw-dnd-layout-page__placeholder" message="DROP LAYOUT HERE" canRemove={false}/>
        }
      />
      <Drawer
        placement="right"
        header={<h3>Settings</h3>}
        isShow={!!SettingsView}
        onClose={() => setEditingItemId('')}
      >
        <Scrollable className="pw-dnd-layout-page__settings">
          {
            SettingsView && <SettingsView {...editingItem}/>
          }
        </Scrollable>
      </Drawer>
    </>
  );
};

export default Page;
