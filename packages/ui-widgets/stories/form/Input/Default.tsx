import React from 'react';

import { Input, Card, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Input types</h3>}>
      <Input label="OUTLINED" value="INPUT WIDGET"/>
      <Input label="UNDERLINED" type="underlined" />
    </Card>
    <Card header={<h3>Label placement</h3>}>
      <Input label="OUTLINED" labelPlacement="top" />
    </Card>
    <Card header={<h3>Input left & right</h3>}>
      <Input label="OUTLINED" left={<Icons.Form />} />
      <Input label="UNDERLINED" right={<Icons.Form />} type="underlined" />
    </Card>
    <Card header={<h3>Input sizes</h3>}>
      <Input label="OUTLINED XS" size="xs"/>
      <Input label="OUTLINED S" size="s"/>
      <Input label="OUTLINED M" size="m"/>
      <Input label="OUTLINED L" size="l"/>
      <Input label="OUTLINED XL" size="xl"/>
      <Input label="UNDERLINED XS" type="underlined" size="xs"/>
      <Input label="UNDERLINED S" type="underlined" size="s"/>
      <Input label="UNDERLINED M" type="underlined" size="m"/>
      <Input label="UNDERLINED L" type="underlined" size="l"/>
      <Input label="UNDERLINED XL" type="underlined" size="xl"/>
    </Card>
  </div>
);
