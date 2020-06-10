import React, { ComponentType, FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import Page from './Page';
import { Scrollable } from '../../layout/Scrollable';
import { Drawer } from '../../layout/Drawer';
import { Card } from '../../layout/Card';
import { FormMode, Item, FormProps, ItemMetadata, LayoutNodeTypes } from './types';
import { Input } from '../../form/Input';

interface Props extends FormProps {
  mode: FormMode;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  onItemPropsChange?: (newItem: Item) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
  onNameChange?: (name: string) => void;
  onClickHeaderImage?: () => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const Form: FunctionComponent<Props> = ({
  headerImage,
  theme,
  name,
  mode,
  layout = [],
  items,
  layoutComponentMap,
  itemComponentMap,
  onRemoveItem,
  onDuplicateItem,
  onRemoveLayout,
  onItemPropsChange,
  onClickHeaderImage,
  onNameChange,
  setRef,
}) => {
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
    <div className={classNames('pw-form', theme && `pw-form--theme-${theme}`, headerImage && 'pw-form--with-header-img ')}>
      <Card
        className="pw-form__body"
        setRef={setRef}
        header={
          <Card.Header primary={
              <>
                {
                  headerImage && (
                    <div className="pw-form__header-img" onClick={onClickHeaderImage}>
                      <img src={headerImage}/>
                    </div>
                  )
                }
                <div className="pw-form__header">
                  {
                    mode !== FormMode.DESIGN
                      ? <span className="pw-form__title">{name}</span>
                      :
                      <Input
                        type="underlined"
                        className="pw-form__title"
                        value={name}
                        onChange={(e: any) => onNameChange && onNameChange(e.target.value)}
                      />
                  }
                </div>
              </>
            }
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
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
              onDuplicateItem={onDuplicateItem}
              onRemoveLayout={onRemoveLayout}
              onItemPropsChange={onItemPropsChange}
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
              SettingsView && <SettingsView item={editingItem} onUpdate={onItemPropsChange}/>
            }
          </Scrollable>
        </Drawer>
      </Card>
    </div>
  );
};

export default Form;
