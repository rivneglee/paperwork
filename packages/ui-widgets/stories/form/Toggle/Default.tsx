import React, { useState } from 'react';

import { Toggle, Tooltip, Icons } from '../../../src';

export default () => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Toggle label="Enable feature" checked={checked} onChange={(e: any) => setChecked(e.target.checked)} />
      <Toggle disabled={true} label="Disabled" checked={true} />
      <Toggle disabled={true} label="Required" isRequired checked={true} />
      <Toggle
        disabled={true}
        label="With label accessor"
        checked={true}
        labelAccessory={
          <Tooltip content="Paperwork is pretty cool!" placement="top">
            <Icons.Info />
          </Tooltip>
        }
      />
    </div>
  );
};
