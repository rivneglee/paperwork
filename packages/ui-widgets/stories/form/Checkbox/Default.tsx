import React, { useState } from 'react';

import { Checkbox, CheckState, Card } from '../../../src';

export default () => {
  const [checkState, setCheckState] = useState<CheckState>('unchecked');
  const [checkState2, setCheckState2] = useState<CheckState>('unchecked');
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Card>
        <Checkbox
          value={checkState}
          label="Two states checkbox"
          onChange={state => setCheckState(state)}
        />
        <Checkbox
          enableIntermediateState
          value={checkState2}
          label="Three states checkbox"
          onChange={state => setCheckState2(state)}
        />
      </Card>
    </div>
  );
};
