import React, { FunctionComponent } from 'react';
import { Item, LineItemTable, Input, SelectOption, Select } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';
import { InputItemTypes } from '../../index';
import ComboBoxMappings from './ComboBoxMappings';
import FormulaEditor from './FormulaEditor';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const columnsConfig = [
  { columnName: 'Field' },
  { columnName: 'Mapping' },
];

const Settings: FunctionComponent<Props> = ({ onUpdate, item: { enableDataBinding, ...item }  }) => {
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
      fieldName: e.target.value,
    });
  };

  const { targetDataSource, fieldName, items = {} } = item;
  const { fieldId, ...dataSource } = targetDataSource || {};
  const mappingTypes = [InputItemTypes.COMBOBOX];
  const mappingItems = Object
      .values(items)
      .filter(({ itemType }) => mappingTypes.includes(itemType))
      .map(({ id, fieldName }) => ({ label: fieldName || id, value: id }));
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
      <FormulaEditor item={item} />
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
                      options={mappingItems}
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
