import React from 'react';

import { Tooltip, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center' }}>
    <Tooltip content={<span>This is tooltip</span>}>
      <Icons.Form />
    </Tooltip>
  </div>
);
