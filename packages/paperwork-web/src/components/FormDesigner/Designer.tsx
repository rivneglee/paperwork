import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  Card,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

import './Designer.scss';
import ActionBar, { FormItemProps } from './ActionBar';
import {
  combobox,
  richText,
  textInput,
  HorizontalList,
  VerticalList,
  InputItemTypes,
  LayoutItemTypes,
} from '../FormAddons';
import defaultHeaderImg from './images/default-header.jpeg';

interface Props extends FormProps {
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap?: {[itemType: string]: ItemMetadata};
  fieldItems: FormItemProps[];
  statisticItems: FormItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const defaultLayoutComponentMap = {
  [LayoutItemTypes.VERTICAL_LIST]: VerticalList,
  [LayoutItemTypes.HORIZONTAL_LIST]: HorizontalList,
};

const defaultItemComponentMap = {
  [InputItemTypes.RICH_TEXT]: richText,
  [InputItemTypes.TEXT_INPUT]: textInput,
  [InputItemTypes.COMBOBOX]: combobox,
};

const Designer: FunctionComponent<Props> = ({
  fieldItems,
  statisticItems,
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap = defaultItemComponentMap,
  onChange,
  setRef,
  ...otherProps
}) => (
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
            headerImage={props.headerImage || defaultHeaderImg}
          />
        </Card>
      )
    }
  </EventHandlerProvider>
);

export default Designer;
