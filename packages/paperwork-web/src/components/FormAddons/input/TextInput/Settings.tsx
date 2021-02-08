import React, { FunctionComponent } from 'react';
import { Input, Item, SelectOption, Toggle } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, ...item } }) => {
  const onToggleChange = (key: string) => (e: any) => {
    onUpdate({
      ...item,
      [key]: e.target.checked,
    });
  };
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
      <Toggle
        checked={item.isRequired}
        label="Required"
        labelPlacement="top"
        onChange={onToggleChange('isRequired')}
      />
    </>
  );
};

export default Settings;
