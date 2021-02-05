import React, { FunctionComponent } from 'react';
import { Item, LineItemTable, Input, SelectOption, Select } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';
import { ExpressionItemTypes, InputItemTypes } from '../../index';
import ComboBoxMappings from './ComboBoxMappings';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const columnsConfig = [
  { columnName: 'Field' },
  { columnName: 'Mapping' },
];

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, isCreatingDs, ...item }  }) => {
  const { itemValueMappings = [] } = item;

  const onAddItemMapping = (option: SelectOption, key: string, value: any) => {
    onUpdate({
      ...item,
      itemValueMappings: [...itemValueMappings, { [key]: value }],
    });
  };

  const onUpdateItemMapping = (index: number, key: string, value: any) => {
    const newMappings = itemValueMappings.map((option: SelectOption, i: number) => {
      if (i !== index) return option;
      return {
        ...option,
        [key]: value,
      };
    });
    onUpdate({
      ...item,
      itemValueMappings: newMappings,
    });
  };

  const onRemoveItemMapping = (index: number) => {
    const newMappings = itemValueMappings.filter((_: SelectOption, i: number) => i !== index);
    onUpdate({
      ...item,
      itemValueMappings: newMappings,
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
      creatingDataSource: {
        fieldName: e.target.value,
      },
    });
  };

  const { targetDataSource, creatingDataSource = {}, items = {} } = item;
  const { fieldId, ...dataSource } = targetDataSource || {};
  const { fieldName = item.label } = creatingDataSource;
  const excludeItemTypes = [InputItemTypes.RICH_TEXT, ExpressionItemTypes.FORMULA];
  const availableItems = Object
      .values(items)
      .filter(({ itemType }) => !excludeItemTypes.includes(itemType))
      .map(({ id, label }) => ({ label: label || id, value: id }));
  return (
    <>
      {
        enableDataBinding && (
          <DataBinding
            onBind={onBind}
            fieldSelection={targetDataSource && fieldId}
            dataSource={targetDataSource && dataSource}
          />
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
      <LabelSettings item={item} onUpdate={onUpdate}/>
      <LineItemTable
        columnsConfig={columnsConfig}
        data={itemValueMappings}
        onAddRow={onAddItemMapping}
        onUpdateRow={onUpdateItemMapping}
        onRemoveRow={onRemoveItemMapping}
        renderRow={(index, data, onChange) => {
          const { itemId, valueMappings } = data;
          const selectedItem = items[itemId];
          const { itemType } = selectedItem || {};
          return (
              <LineItemTable.Row columnsConfig={columnsConfig}>
                <LineItemTable.Item>
                  <Select
                      selectedValue={itemId}
                      onChange={itemId => onChange('itemId', itemId)}
                      options={availableItems}
                  />
                </LineItemTable.Item>
                <LineItemTable.Item>
                  {
                    itemType === InputItemTypes.COMBOBOX && (
                        <ComboBoxMappings
                            valueMappings={valueMappings}
                            onUpdate={valueMappings =>
                                onChange('valueMappings', { ...valueMappings, [itemId]: valueMappings })}
                            comboboxItem={selectedItem}
                        />
                    )
                  }
                </LineItemTable.Item>
              </LineItemTable.Row>
          );
        }}
      />
    </>
  );
};

export default Settings;
