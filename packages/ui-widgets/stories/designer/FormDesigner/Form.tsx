import React from 'react';

import { Form, Input, Select, LineItemTable, FormMode } from '../../../src';
import { layout, items } from './fixtures/data';

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
    <div>
      <Form
        mode={FormMode.DESIGN}
        name="Author view"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {}}
      />
      <Form
        mode={FormMode.EDIT}
        name="Committer view"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {}}
      />
      <Form
        name="History view"
        mode={FormMode.READONLY}
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {}}
      />
    </div>
  );
};
