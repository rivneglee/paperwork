import React from 'react';

import { Avater, Dropdown, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center' }}>
    <Dropdown align="right" items={[
      <Dropdown.Item icon={<Icons.Add />}>Menu 1</Dropdown.Item>,
      <Dropdown.Item icon={<Icons.Chart />}>Menu 2</Dropdown.Item>,
      <Dropdown.Item icon={<Icons.Form />}>Menu 3 long long long long</Dropdown.Item>,
    ]}>
      <Avater>S</Avater>
    </Dropdown>
  </div>
);
