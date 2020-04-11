import React from 'react';

import { List, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <List>
      <List.Item icon={<Icons.Form />}>
        Forms
      </List.Item>
      <List.Item icon={<Icons.Chart />}>
        Reports
      </List.Item>
    </List>
  </div>
);
