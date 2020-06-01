import React from 'react';

import { Form, Input, Select, FormMode } from '../../../src';
import { layout, items } from './fixtures/data';

const itemComponentMap = {
  input: { MainView: Input },
  select: { MainView: Select },
};

export default () => {
  return (
    <div>
      <Form
        headerImage="/form-header.png"
        theme="orange"
        mode={FormMode.DESIGN}
        name="Header image"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {}}
      />
    </div>
  );
};
