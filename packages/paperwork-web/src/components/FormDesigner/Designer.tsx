import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  Card,
  LayoutNodeTypes,
  SimpleList,
  FormProps,
  EventHandlerProvider,
  FormThemeColors,
} from '@paperwork/ui-widgets';

import './Designer.scss';
import ActionBar, { ToolkitItemProps } from './ActionBar';

interface Props extends FormProps {
  layoutComponentMap?: {[layoutType: string]: ComponentType<any>};
  itemComponentMap: {[itemType: string]: ItemMetadata};
  toolkitItems: ToolkitItemProps[];
  onChange?: (formProps: FormProps) => void;
}

const defaultLayoutComponentMap = {
  [LayoutNodeTypes.SIMPLE_LIST]: SimpleList,
};

const Designer: FunctionComponent<Props> = ({
  toolkitItems,
  layoutComponentMap = defaultLayoutComponentMap,
  itemComponentMap,
  onChange,
  ...otherProps
}) => (
  <EventHandlerProvider {...otherProps} onChange={onChange}>
    {
      props => (
        <Card className="pwapp-designer">
          <ActionBar
            toolkitItems={toolkitItems}
            onChangeTheme={(theme: FormThemeColors) => onChange && onChange({
              ...otherProps,
              theme,
            })}
          />
          <Form
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

export default Designer;
