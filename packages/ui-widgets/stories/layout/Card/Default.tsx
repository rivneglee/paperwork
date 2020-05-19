import React from 'react';

import { Card, Button, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card
      header={
        <Card.Header
          icon={<Icons.Chart/>}
          primary="Header"
          secondary={<Button color="secondary">Create new</Button>}
        />
      }
      footer="Footer"
    >
      <div>This is a card</div>
    </Card>
  </div>
);
