import React, { FunctionComponent } from 'react';
import { Item, Input, SelectOption } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';
import FormulaEditor from './FormulaEditor';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, ...item }  }) => {

  const onBind = (dataSource: DataSourceOption, field: SelectOption) => {
    onUpdate({
      ...item,
      targetDataSource: {
        ...dataSource,
        fieldId: field.value,
      },
    });
  };

  const onFieldNameChange = (e: any) => {
    onUpdate({
      ...item,
      fieldName: e.target.value,
    });
  };
  const { targetDataSource, fieldName } = item;
  const { fieldId, ...dataSource } = targetDataSource || {};
  debugger;
  return (
    <>
      <Input
          label="Name"
          labelPlacement="top"
          isRequired
          value={fieldName}
          onChange={onFieldNameChange}
      />
      {
        enableDataBinding && (
          <DataBinding
            onBind={onBind}
            fieldSelection={targetDataSource && fieldId}
            dataSource={targetDataSource && dataSource}
          />
        )
      }
      <LabelSettings item={item} onUpdate={onUpdate}/>
      <FormulaEditor item={item} onUpdate={onUpdate}/>
    </>
  );
};

export default Settings;
