import React from 'react';

import { QuickAdd, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center' }}>
    <QuickAdd>
      <QuickAdd.Item icon={<Icons.Form />} />
      <QuickAdd.Item icon={<Icons.Chart />} />
    </QuickAdd>
  </div>
);
