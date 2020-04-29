import React from 'react';

import { Search, Card } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Input types</h3>}>
      <Search placeholder="Search..."/>
    </Card>
  </div>
);
