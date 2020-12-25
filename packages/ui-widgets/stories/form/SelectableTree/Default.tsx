import React, { useState } from 'react';

import { SelectableTree, Card } from '../../../src';

const nodes = [
  {
    value: 'mobile',
    label: 'Mobile',
    children: [
      { value: 'ios', label: 'IOS', children: [{ value: 'objectc', label: 'Object C' }] },
      { value: 'android', label: 'Android' },
    ],
  },
  {
    value: 'web',
    label: 'Web',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vuejs', label: 'Vue.js' },
    ],
  },
];

export default () => {
  const [checkState, setCheckState] = useState<object>({});
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Card>
        <SelectableTree
          showSearch
          label="Select book category"
          menuAlignment="left"
          treeNodes={nodes}
          checked={checkState}
          onCheck={checked => setCheckState(checked)}
        />
      </Card>
    </div>
  );
};
