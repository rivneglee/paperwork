import React from 'react';

import { Avater } from '../../../src';
import './avater.scss';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex' }}>
    <Avater size="small" className="storm-70">S</Avater>
    <Avater size="medium" className="storm-100">M</Avater>
    <Avater size="large" className="storm-golf">L</Avater>
  </div>
);
