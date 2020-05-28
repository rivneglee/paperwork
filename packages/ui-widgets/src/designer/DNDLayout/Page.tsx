import React, { FunctionComponent, ComponentType } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import DraggableList from './DraggableList';
import { DragAndDropType, Item, Layout, LayoutLinkedNode, LayoutNodeTypes } from './types';
import SimpleList from './SimpleList';
import Placeholder from './Placeholder';

interface Props {
  id: string;
  layout: Layout;
  items: {[key:string]: Item};
  layoutComponentMap?: {[key: string]: ComponentType<any>};
  itemComponentMap: {[key: string]: ComponentType<any>};
  onDragEnd?: (result: DropResult) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
  onEditItem?: (id: string) => void;
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
  onEditItem,
  onRemoveLayout,
  dragAndDropDisabled,
  readonly,
}) => {
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
  );
};

export default Page;
