import React from 'react';

import { Avater } from '../../../src';
import './avater.scss';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex' }}>
    <Avater size="large" className="storm-white" shadow>L</Avater>
  </div>
);
