import React from 'react';

import { Button, Card, ButtonRow } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Button row</h3>}>
      <ButtonRow
        primary={[
          <Button color="primary">
            Primary
          </Button>,
        ]}
        secondary={[
          <Button>
            Default
          </Button>,
        ]}/>
    </Card>
  </div>
);
