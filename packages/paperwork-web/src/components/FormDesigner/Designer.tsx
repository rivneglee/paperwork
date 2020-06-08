import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  Card,
  SimpleList,
  FormProps,
  EventHandlerProvider,
  FormThemeColors,
} from '@paperwork/ui-widgets';

import './Designer.scss';
import ActionBar, { LayoutItemTypes, ToolkitItemProps } from './ActionBar';

interface Props extends FormProps {
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  toolkitItems: ToolkitItemProps[];
  onChange: (formProps: FormProps) => void;
  setRef?: (ref: HTMLDivElement) => void;
}

const HorizontalList = (props: any) => <SimpleList {...props} direction="horizontal"/>;

const defaultLayoutComponentMap = {
  [LayoutItemTypes.VERTICAL_LIST]: SimpleList,
  [LayoutItemTypes.HORIZONTAL_LIST]: HorizontalList,
};

const Designer: FunctionComponent<Props> = ({
  toolkitItems,
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap,
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
              toolkitItems={toolkitItems}
              onChangeTheme={(theme: FormThemeColors) => onChange({
                ...otherProps,
                theme,
              })}
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
