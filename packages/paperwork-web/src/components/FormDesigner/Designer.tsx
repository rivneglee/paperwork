import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  Card,
  SimpleList,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

import './Designer.scss';
import ActionBar, { LayoutItemTypes, FormItemProps } from './ActionBar';
import { Combobox, TextInput } from '../FormItems';

interface Props extends FormProps {
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap?: {[itemType: string]: ItemMetadata};
  fieldItems: FormItemProps[];
  statisticItems: FormItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const HorizontalList = (props: any) => <SimpleList {...props} direction="horizontal"/>;

const defaultLayoutComponentMap = {
  [LayoutItemTypes.VERTICAL_LIST]: SimpleList,
  [LayoutItemTypes.HORIZONTAL_LIST]: HorizontalList,
};

const defaultItemComponentMap = {
  input: { MainView: TextInput },
  select: { MainView: Combobox },
};

const Designer: FunctionComponent<Props> = ({
  fieldItems,
  statisticItems,
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap = defaultItemComponentMap,
  onChange,
  setRef,
  ...otherProps
}) => {
  return (
    <EventHandlerProvider {...otherProps} onChange={onChange}>
      {
        props => (
          <Card className="pwapp-designer">
            <ActionBar
              statisticItems={statisticItems}
              fieldItems={fieldItems}
            />
            <Form
              setRef={setRef}
              mode={FormMode.DESIGN}
              layoutComponentMap={layoutComponentMap}
              itemComponentMap={itemComponentMap}
              {...props}
            />
          </Card>
        )
      }
    </EventHandlerProvider>
  );
};

export default Designer;
