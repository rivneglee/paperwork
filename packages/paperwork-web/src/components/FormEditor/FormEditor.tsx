import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

import {
  combobox,
  richText,
  textInput,
  HorizontalList,
  VerticalList,
  InputItemTypes,
  LayoutItemTypes,
} from '../FormAddons';
import defaultHeaderImg from '../FormDesigner/images/default-header.jpeg';

interface Props extends FormProps {
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap?: {[itemType: string]: ItemMetadata};
  onChange: (formProps: FormProps) => void;
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

const FormEditor: FunctionComponent<Props> = ({
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap = defaultItemComponentMap,
  onChange,
  ...otherProps
}) =>  (
  <EventHandlerProvider {...otherProps} onChange={onChange}>
    {
      props => (
        <Form
          mode={FormMode.EDIT}
          layoutComponentMap={layoutComponentMap}
          itemComponentMap={itemComponentMap}
          {...props}
          headerImage={otherProps.headerImage || defaultHeaderImg}
        />
      )
    }
  </EventHandlerProvider>
);

export default FormEditor;
