import React from 'react';

import { Balloon } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center' }}>
    <Balloon content={4}>
      Notification
    </Balloon>
  </div>
);
