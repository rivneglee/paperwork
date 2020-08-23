import React, { useState } from 'react';

import { Card, Paginator } from '../../../src';

export default () => {
  const [current, setCurrent] = useState(1);
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Card header={<h3>Paginator</h3>}>
        <Paginator total={50} current={current} onNavigate={setCurrent}/>
      </Card>
    </div>
  );
};
