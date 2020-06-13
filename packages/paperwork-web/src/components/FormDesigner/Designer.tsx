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
import defaultHeaderImg from './images/default-header.jpeg';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  fieldItems: FormItemProps[];
  statisticItems: FormItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const Designer: FunctionComponent<Props> = ({
  fieldItems,
  statisticItems,
  layoutComponentMap,
  itemComponentMap,
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
