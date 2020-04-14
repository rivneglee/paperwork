import React from 'react';

import { Spinner, Card } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Spinner types</h3>}>
      <Spinner type="box" title="BOX"/>
      <Spinner type="donut" title="DONUT"/>
      <Spinner type="ellipsis" title="ELLIPSIS"/>
    </Card>
    <Card header={<h3>Spinner sizes</h3>}>
      <Spinner size="s" title="Small"/>
      <Spinner size="m" title="Medium"/>
      <Spinner size="l" title="Large"/>
      <Spinner type="donut" size="s" title="Small"/>
      <Spinner type="donut" size="m" title="Medium"/>
      <Spinner type="donut" size="l" title="Large"/>
      <Spinner type="ellipsis" size="s" title="Small"/>
      <Spinner type="ellipsis" size="m" title="Medium"/>
      <Spinner type="ellipsis" size="l" title="Large"/>
    </Card>
  </div>
);
