import React, { FunctionComponent } from 'react';
import { Input, Item, Toggle } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, isCreatingDs, ...item } }) => {
  const onToggleChange = (key: string) => (e: any) => {
    onUpdate({
      ...item,
      [key]: e.target.checked,
    });
  };
  const onBind = (dataSource: DataSourceOption, fieldId: string) => {
    onUpdate({
      ...item,
      targetDataSource: {
        ...dataSource,
        fieldId,
      },
    });
  };
  const onFieldNameChange = (e: any) => {
    onUpdate({
      ...item,
      creatingDataSource: {
        fieldName: e.target.value,
      },
    });
  };
  const { targetDataSource, creatingDataSource = {} } = item;
  const { fieldId, ...dataSource } = targetDataSource || {};
  const { fieldName = item.label } = creatingDataSource;
  return (
    <>
      <LabelSettings item={item} onUpdate={onUpdate}/>
      <Toggle
        checked={item.isRequired}
        label="Required"
        labelPlacement="top"
        onChange={onToggleChange('isRequired')}
      />
      {
        enableDataBinding && (
          <DataBinding onBind={onBind} fieldId={targetDataSource && fieldId} dataSource={targetDataSource && dataSource}/>
        )
      }
      {
        isCreatingDs && (
          <Input
            label="Datasource field name"
            labelPlacement="top"
            isRequired
            value={fieldName}
            onChange={onFieldNameChange}
          />
        )
      }
    </>
  );
};

export default Settings;
