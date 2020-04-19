import React from 'react';

import { Badge, Card } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Badge colours</h3>}>
      <Badge>default</Badge>
      <Badge color="primary">primary</Badge>
      <Badge color="secondary">secondary</Badge>
    </Card>
  </div>
);
