import React from 'react';

import { Avater, Dropdown } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center' }}>
    <Dropdown items={[
      <Dropdown.Item>Menu 1</Dropdown.Item>,
      <Dropdown.Item>Menu 2</Dropdown.Item>,
      <Dropdown.Item>Menu 3 long long long long</Dropdown.Item>,
    ]}>
      <Avater>S</Avater>
    </Dropdown>
  </div>
);
