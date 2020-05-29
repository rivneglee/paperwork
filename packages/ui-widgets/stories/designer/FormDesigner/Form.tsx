import React from 'react';

import {Form, LayoutNodeTypes, Input, Select, LineItemTable, FormMode} from '../../../src';

const layout = [
  { id: 'page1', childRefs: ['list1', 'list2'], type:  LayoutNodeTypes.PAGE },
  { id: 'list1', childRefs: ['item1', 'item2'], type:  LayoutNodeTypes.SIMPLE_LIST },
  { id: 'item1', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
  { id: 'item2', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
  { id: 'list2', childRefs: [], type:  LayoutNodeTypes.SIMPLE_LIST },
];

const items = {
  item1: { id: 'item1', itemType: 'input', value: 'I am item 1' },
  item2: { id: 'item2', itemType: 'select', selectedValue: ['r', 'g'], isMultipleSelect: true, options: [
      { value: 'r', label: 'Red' },
      { value: 'g', label: 'Green' },
      { value: 'b', label: 'Blue' },
  ]},
};

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
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
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
