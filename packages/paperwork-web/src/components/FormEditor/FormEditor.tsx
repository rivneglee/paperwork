import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

import defaultHeaderImg from '../FormDesigner/images/default-header.jpeg';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
}

const FormEditor: FunctionComponent<Props> = ({
  layoutComponentMap,
  itemComponentMap,
  ...otherProps
}) => (
  <EventHandlerProvider {...otherProps}>
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
