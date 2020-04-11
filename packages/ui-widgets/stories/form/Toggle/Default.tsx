import React, { useState } from 'react';

import { Toggle } from '../../../src';

export default () => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Toggle label="Enable feature" checked={checked} onChange={(e: any) => setChecked(e.target.checked)} />
      <Toggle disabled={true} label="Disabled" checked={true} />
    </div>
  );
};
