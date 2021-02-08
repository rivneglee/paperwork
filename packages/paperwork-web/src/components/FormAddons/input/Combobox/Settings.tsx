import React, { FunctionComponent } from 'react';
import { Item, LineItemTable, Input, SelectOption, Toggle } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const columnsConfig = [
  { columnName: 'Text' },
  { columnName: 'Value' },
];

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, ...item }  }) => {
  const { options = [], isRequired, isMultipleSelect } = item;

  const onAddOption = (option: any, key: string, value: any) => {
    onUpdate({
      ...item,
      options: [...options, { id: option.id, [key]: value }],
    });
  };

  const onUpdateOption = (index: number, key: string, value: any) => {
    const newOptions = options.map((option: SelectOption, i: number) => {
      if (i !== index) return option;
      return {
        ...option,
        [key]: value,
      };
    });
    onUpdate({
      ...item,
      options: newOptions,
    });
  };

  const onRemoveOption = (index: number) => {
    const newOptions = options.filter((_: SelectOption, i: number) => i !== index);
    onUpdate({
      ...item,
      options: newOptions,
    });
  };

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
        checked={isRequired}
        label="Required"
        labelPlacement="top"
        onChange={onToggleChange('isRequired')}
      />
      <Toggle
        checked={isMultipleSelect}
        label="Multi-select"
        labelPlacement="top"
        onChange={onToggleChange('isMultipleSelect')}
      />
      <LineItemTable
        columnsConfig={columnsConfig}
        data={options}
        onAddRow={onAddOption}
        onUpdateRow={onUpdateOption}
        onRemoveRow={onRemoveOption}
        renderRow={(index, data, onChange) => (
          <LineItemTable.Row columnsConfig={columnsConfig}>
            <LineItemTable.Item>
              <Input value={data.label} onChange={(e: any) => onChange('label', e.target.value)}/>
            </LineItemTable.Item>
            <LineItemTable.Item>
              <Input value={data.value}  onChange={(e: any) => onChange('value', e.target.value)}/>
            </LineItemTable.Item>
          </LineItemTable.Row>
        )}
      />
    </>
  );
};

export default Settings;
