import React, { ComponentType, FunctionComponent } from 'react';
import { FormMode, Layout, Items, Item, ItemMetadata, DropEvent, Context, Form } from '@paperwork/ui-widgets';

import FooterNavigation from './FooterNavigation';
import './Designer.scss';

interface Props {
  headerImage?: string;
  theme?: 'red' | 'pink' | 'purple' | 'indigo'
    | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green'
    | 'light-green' | 'lime' | 'yellow' | 'amber'
    | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';
  name: string;
  layout: Layout;
  items: Items;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  onDragEnd: (result: DropEvent) => void;
  onUpdateItemSettings?: (newItem: Item) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
}

const Designer: FunctionComponent<Props> = ({ onDragEnd, ...otherProps }: Props) => {
  return (
    <div>
      <Context onDragEnd={onDragEnd}>
        <Form mode={FormMode.DESIGN} {...otherProps}/>
        <FooterNavigation />
      </Context>
    </div>
  );
};

export default Designer;
