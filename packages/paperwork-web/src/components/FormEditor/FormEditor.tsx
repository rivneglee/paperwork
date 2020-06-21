import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  FormProps,
  EventHandlerProvider,
} from '@paperwork/ui-widgets';

import HeaderImagesProvider from '../FormHeaderImageProvider/HeaderImagesProvider';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemMetadataMap: {[itemType: string]: ItemMetadata};
}

const FormEditor: FunctionComponent<Props> = ({
  layoutComponentMap,
  itemMetadataMap,
  ...otherProps
}) => (
  <HeaderImagesProvider>
    {
      ({ getImageByKey }) => (
        <EventHandlerProvider {...otherProps}>
          {
            props => (
              <Form
                mode={FormMode.EDIT}
                layoutComponentMap={layoutComponentMap}
                itemMetadataMap={itemMetadataMap}
                {...props}
                headerImage={getImageByKey(otherProps.headerImage)}
              />
            )
          }
        </EventHandlerProvider>
      )
    }
  </HeaderImagesProvider>
);

export default FormEditor;
