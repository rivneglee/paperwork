import React from 'react';

import { Card, RichEditor } from '../../../src';

const mentions = [
  {
    id: '1',
    name: 'Matthew Russell',
  },
  {
    id: '2',
    name: 'Julian Krispel-Samsel',
  },
  {
    id: '3',
    name: 'Jyoti Puri',
  },
];

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>TextArea mode</h3>}>
      <RichEditor showToolbar={false} label="Description" size="l"  />
    </Card>
    <Card header={<h3>With toolbar</h3>}>
      <RichEditor label="Description" size="l" contentHtml="Select text to show toolbar" />
    </Card>
    <Card header={<h3>With mentions</h3>}>
      <RichEditor
          showToolbar={false}
          mentions={mentions}
          label="Description"
          size="l"
          contentHtml="Enter '@' to mention someone"
      />
    </Card>
  </div>
);
