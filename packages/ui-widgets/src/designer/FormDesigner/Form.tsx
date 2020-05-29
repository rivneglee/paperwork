import React, { ComponentType, FunctionComponent, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import classNames from 'classnames';

import Page from './Page';
import { Scrollable } from '../../layout/Scrollable';
import { Drawer } from '../../layout/Drawer';
import { Card } from '../../layout/Card';
import { FormMode, Item, ItemMetadata, Items, Layout, LayoutNodeTypes } from './types';
import { Input } from '../../form/Input';

interface Props {
  name: string;
  mode: FormMode;
  layout: Layout;
  items: Items;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  onDragEnd?: (result: DropResult) => void;
  onUpdateItemSettings?: (newItem: Item) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
}

const Form: FunctionComponent<Props> = ({
  name,
  mode,
  layout = [],
  items,
  layoutComponentMap,
  itemComponentMap,
  onDragEnd,
  onRemoveItem,
  onDuplicateItem,
  onRemoveLayout,
  onUpdateItemSettings,
}) => {
  const disableHeader = mode !== FormMode.DESIGN;
  const pages = layout.filter(({ type }) => type === LayoutNodeTypes.PAGE);
  const onEditItem = (id: string) => setEditingItemId(id);
  const [editingItemId, setEditingItemId] = useState('');
  const editingItem = items[editingItemId];

  let SettingsView = null;
  if (editingItem) {
    const itemMetadata = itemComponentMap[editingItem.itemType];
    SettingsView = itemMetadata.SettingsView;
  }

  return (
    <Card
      className="pw-form"
      header={
        <Card.Header primary={
          <Input
            type="underlined"
            className={classNames('pw-form__title', disableHeader && 'pw-form__title--readonly')}
            disabled={disableHeader}
            value={name}
          />}
        />
      }
    >
      {
        pages.map(page => (
          <Page
            id={page.id}
            key={page.id}
            layout={layout}
            items={items}
            layoutComponentMap={layoutComponentMap}
            itemComponentMap={itemComponentMap}
            onDragEnd={onDragEnd}
            onEditItem={onEditItem}
            onRemoveItem={onRemoveItem}
            onDuplicateItem={onDuplicateItem}
            onRemoveLayout={onRemoveLayout}
            onUpdateItemSettings={onUpdateItemSettings}
            dragAndDropDisabled={mode === FormMode.EDIT || mode === FormMode.READONLY}
            readonly={mode === FormMode.READONLY}
          />
        ))
      }
      <Drawer
        placement="right"
        header={<h3>Settings</h3>}
        isShow={!!SettingsView}
        onClose={() => setEditingItemId('')}
      >
        <Scrollable className="pw-form__settings">
          {
            SettingsView && <SettingsView {...editingItem} onUpdate={onUpdateItemSettings}/>
          }
        </Scrollable>
      </Drawer>
    </Card>
  );
};

export default Form;
