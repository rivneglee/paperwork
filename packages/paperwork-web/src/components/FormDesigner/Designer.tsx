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
import HeaderImagesProvider from '../FormHeaderImageProvider/HeaderImagesProvider';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemMetadataMap: {[itemType: string]: ItemMetadata};
  fieldItems: FormItemProps[];
  buttonItems: FormItemProps[];
  statisticItems: FormItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const Designer: FunctionComponent<Props> = ({
  fieldItems,
  buttonItems,
  statisticItems,
  layoutComponentMap,
  itemMetadataMap,
  onChange,
  setRef,
  ...otherProps
}) => (
  <HeaderImagesProvider>
    {
      ({ getImageByKey }) => (
        <EventHandlerProvider {...otherProps} onChange={onChange}>
          {
            props => (
              <Card className="pwapp-designer">
                <ActionBar
                  statisticItems={statisticItems}
                  fieldItems={fieldItems}
                  buttonItems={buttonItems}
                />
                <Form
                  setRef={setRef}
                  mode={FormMode.DESIGN}
                  layoutComponentMap={layoutComponentMap}
                  itemMetadataMap={itemMetadataMap}
                  {...props}
                  headerImage={getImageByKey(props.headerImage)}
                />
              </Card>
            )
          }
        </EventHandlerProvider>
      )
    }
  </HeaderImagesProvider>
);

export default Designer;
