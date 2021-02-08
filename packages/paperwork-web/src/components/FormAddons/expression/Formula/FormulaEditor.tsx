import React, { FunctionComponent } from 'react';
import { Item, RichEditor } from '@paperwork/ui-widgets';

interface Props {
  item: Item;
}

const FormulaEditor: FunctionComponent<Props> = ({
  item,
}) => {
  const { items } = item;
  const mentions = Object.values(items)
      .filter(({ fieldName }) => !!fieldName)
      .map(({ id, type, fieldName }) => ({
        id, type, name: fieldName,
      }));
  return (
      <RichEditor label="Expression" labelPlacement="top" mentions={mentions} showToolbar={false} />
  );
};

export default FormulaEditor;
