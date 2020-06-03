import React, { ComponentType, FunctionComponent } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FormMode, Item, ItemMetadata, Items, Layout } from '../Form/types';
import Form from '../Form/Form';
import Toolbox from './Toolbox';

interface Props {
  headerImage?: string;
  theme?: 'red' | 'pink' | 'purple' | 'indigo'
    | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green'
    | 'light-green' | 'lime' | 'yellow' | 'amber'
    | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';
  name: string;
  mode: FormMode;
  layout: Layout;
  items: Items;
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  onDragEnd: (result: DropResult) => void;
  onUpdateItemSettings?: (newItem: Item) => void;
  onRemoveItem?: (id: string) => void;
  onDuplicateItem?: (id: string) => void;
  onRemoveLayout?: (id: string) => void;
}

const Designer: FunctionComponent<Props> = ({ onDragEnd, ...otherProps }: Props) => {
  return (
    <div className="pw-form-designer">
      <DragDropContext onDragEnd={onDragEnd}>
        <Toolbox/>
        <Form {...otherProps}/>
      </DragDropContext>
    </div>
  );
};

export default Designer;
