import React from 'react';

import { Form, Input, Select, FormMode, Context } from '../../../src';
import { layout, items } from '../fixtures/data';

const itemComponentMap = {
  input: { MainView: Input },
  select: { MainView: Select },
};

export default () => {
  return (
    <Context>
      <Form
        headerImage="/form-header.png"
        theme="orange"
        mode={FormMode.DESIGN}
        name="Header image"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
      />
    </Context>
  );
};
