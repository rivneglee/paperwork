import React from 'react';

import { Input, Select, LineItemTable, FormMode, Designer, BaseTemplate } from '../../../src';
import { layout, items } from '../fixtures/data';

const columnsConfig = [
  { columnName: 'Label' },
  { columnName: 'Value' },
];

const SelectSettingsView =  ({ options = [] }: any) => (
  <LineItemTable
    columnsConfig={columnsConfig}
    data={options}
    renderRow={(index, data) => (
      <LineItemTable.Row columnsConfig={columnsConfig}>
        <LineItemTable.Item>
          <Input value={data.label}/>
        </LineItemTable.Item>
        <LineItemTable.Item>
          <Input value={data.value}/>
        </LineItemTable.Item>
      </LineItemTable.Row>
    )}
  />
);

const itemComponentMap = {
  input: { MainView: Input },
  select: { MainView: Select, SettingsView: SelectSettingsView },
};

export default () => {
  return (
    <BaseTemplate>
      <Designer
        mode={FormMode.DESIGN}
        name="Design a form"
        theme="orange"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {}}
      />
    </BaseTemplate>
  );
};
