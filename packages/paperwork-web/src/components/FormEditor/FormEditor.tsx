import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemMetadataMap: {[itemType: string]: ItemMetadata};
}

const FormEditor: FunctionComponent<Props> = ({
  layoutComponentMap,
  itemMetadataMap,
  ...otherProps
}) => (
  <EventHandlerProvider {...otherProps}>
    {
      props => (
        <Form
          mode={FormMode.EDIT}
          layoutComponentMap={layoutComponentMap}
          itemMetadataMap={itemMetadataMap}
          {...props}
          headerImage={otherProps.headerImage}
        />
      )
    }
  </EventHandlerProvider>
);

export default FormEditor;
