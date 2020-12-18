import React, { useState } from 'react';

import { SelectableTree } from '../../../src';

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
    <SelectableTree
      showSearch
      treeNodes={nodes}
      checked={checkState}
      onCheck={checked => setCheckState(checked)}
    />
  );
};
