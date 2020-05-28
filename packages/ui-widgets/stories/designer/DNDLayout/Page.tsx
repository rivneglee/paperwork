import React from 'react';

import { Page, LayoutNodeTypes, Card, Input, Select, LineItemTable } from '../../../src';

const layout = [
  { id: 'page', childRefs: ['list1', 'list2'], type:  LayoutNodeTypes.PAGE },
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
      <Card header={<Card.Header primary="Author view"/>}>
        <Page
          id="page"
          layout={layout}
          items={items}
          itemComponentMap={itemComponentMap}
          onDragEnd={() => {}}
        />
      </Card>
      <Card header={<Card.Header primary="Committer view"/>}>
        <Page
          id="page"
          dragAndDropDisabled
          layout={layout}
          items={items}
          itemComponentMap={itemComponentMap}
          onDragEnd={() => {}}
        />
      </Card>
      <Card header={<Card.Header primary="History view"/>}>
        <Page
          id="page"
          dragAndDropDisabled
          readonly
          layout={layout}
          items={items}
          itemComponentMap={itemComponentMap}
          onDragEnd={() => {}}
        />
      </Card>
    </div>
  );
};
