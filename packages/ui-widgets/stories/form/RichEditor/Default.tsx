import React from 'react';

import { RichEditor } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <RichEditor label="Description" size="l" contentHtml="Select text to show toolbar" />
  </div>
);
