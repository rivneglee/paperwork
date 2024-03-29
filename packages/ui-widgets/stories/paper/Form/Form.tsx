import React from 'react';

import { Form, Input, Select, LineItemTable, FormMode, Context } from '../../../src';
import { layout, items } from '../fixtures/data';

const columnsConfig = [
  { columnName: 'Label' },
  { columnName: 'Value' },
];

const SelectSettingsView =  ({ item }: any) => (
  <LineItemTable
    columnsConfig={columnsConfig}
    data={item.options}
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

const itemMetadataMap = {
  input: { MainView: ({ mode, ...otherProps }: any) => <Input {...otherProps} disabled={mode === FormMode.READONLY}/> },
  select: {
    MainView: ({ mode, ...otherProps }: any) => <Select {...otherProps} disabled={mode === FormMode.READONLY}/>,
    SettingsView: SelectSettingsView,
  },
};

export default () => {
  return (
    <div>
      <Context>
        <Form
          mode={FormMode.DESIGN}
          name="Author view"
          layout={layout}
          items={items}
          itemMetadataMap={itemMetadataMap}
        />
      </Context>
      <Context>
        <Form
          mode={FormMode.EDIT}
          name="Committer view"
          layout={layout}
          items={items}
          itemMetadataMap={itemMetadataMap}
        />
      </Context>
      <Context>
        <Form
          name="History view"
          mode={FormMode.READONLY}
          layout={layout}
          items={items}
          itemMetadataMap={itemMetadataMap}
        />
    </Context>
    </div>
  );
};
