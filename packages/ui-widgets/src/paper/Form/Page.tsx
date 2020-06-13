import React, { FunctionComponent, ComponentType } from 'react';

import DraggableList from './DraggableList';
import {
  DragAndDropType,
  Items,
  ItemMetadata,
  Layout,
  LayoutLinkedNode,
  LayoutNodeTypes,
  Item,
  FormMode,
} from './types';
import SimpleList from './SimpleList';
import Placeholder from './Placeholder';

interface Props {
  id: string;
  layout: Layout;
  items: Items;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemMetadataMap: {[itemType: string]: ItemMetadata};
  onItemPropsChange?: (newItem: Item) => void;
  onEditItem?: (id: string) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
  mode: FormMode;
}

const defaultLayoutComponentMap = {
  [LayoutNodeTypes.SIMPLE_LIST]: SimpleList,
};

const Page: FunctionComponent<Props> = ({
  id,
  layout,
  items,
  layoutComponentMap = defaultLayoutComponentMap,
  itemMetadataMap,
  onEditItem,
  onRemoveItem,
  onDuplicateItem,
  onRemoveLayout,
  onItemPropsChange,
  mode,
}) => {
  const renderItem = (layoutNode: LayoutLinkedNode) => {
    if (layoutNode.childRefs.length === 0 && mode !== FormMode.DESIGN) return null;
    const Layout = layoutComponentMap[layoutNode.type];
    if (Layout) {
      return (
        <div className="pw-dnd-layout-page__layout">
          <Layout
            id={layoutNode.id}
            layout={layout}
            mode={mode}
            items={items}
            itemMetadataMap={itemMetadataMap}
            onItemPropsChange={onItemPropsChange}
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
      disabled={mode !== FormMode.DESIGN}
      placeholder={
        <Placeholder className="pw-dnd-layout-page__placeholder" message="DROP LAYOUT HERE" canRemove={false}/>
      }
    />
  );
};

export default Page;
