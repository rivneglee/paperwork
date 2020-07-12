import React, { FunctionComponent } from 'react';
import { Item, Toggle } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item }) => {
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
  const { targetDataSource, enableDataBinding } = item;
  const { fieldId, ...dataSource } = targetDataSource || {};
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
    </>
  );
};

export default Settings;
