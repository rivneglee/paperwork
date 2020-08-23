import React, { ComponentType, FunctionComponent, ReactElement } from 'react';
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
  fieldItems?: FormItemProps[];
  buttonItems?: FormItemProps[];
  statisticItems?: FormItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
  toolbox?: ReactElement;
}

const Designer: FunctionComponent<Props> = ({
  fieldItems,
  buttonItems,
  statisticItems,
  layoutComponentMap,
  itemMetadataMap,
  onChange,
  setRef,
  toolbox = (
    <ActionBar
      statisticItems={statisticItems}
      fieldItems={fieldItems}
      buttonItems={buttonItems}
    />
  ),
  ...otherProps
}) => (
  <HeaderImagesProvider>
    {
      ({ getImageByKey }) => (
        <EventHandlerProvider {...otherProps} onChange={onChange}>
          {
            props => (
              <Card className="pwapp-designer">
                {toolbox}
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
