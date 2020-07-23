import React, { ComponentType, FunctionComponent } from 'react';
import {
  FormMode,
  ItemMetadata,
  Form,
  FormProps,
  Context,
  Item,
} from '@paperwork/ui-widgets';

interface Props extends FormProps {
  layoutComponentMap: {[layoutType: string]: ComponentType<any>};
  itemMetadataMap: {[itemType: string]: ItemMetadata};
  onChange?: (itemId: string, value: any) => void;
}

const FormEditor: FunctionComponent<Props> = ({
  layoutComponentMap,
  itemMetadataMap,
  onChange,
  ...otherProps
}) => {
  const handleValueChange = (itemProps: Item) => {
    onChange && onChange(itemProps.id, itemProps.value);
  };
  return (
    <Context>
      <Form
        mode={FormMode.EDIT}
        layoutComponentMap={layoutComponentMap}
        itemMetadataMap={itemMetadataMap}
        {...otherProps}
        onItemPropsChange={handleValueChange}
        headerImage={otherProps.headerImage}
      />
    </Context>
  );
};

export default FormEditor;
