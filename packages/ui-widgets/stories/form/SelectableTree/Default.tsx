import React, { useState } from 'react';

import { SelectableTree } from '../../../src';

const nodes = [
  {
    value: 'mars',
    label: 'Mars',
    children: [
    { value: 'phobos', label: 'Phobos' },
    { value: 'deimos', label: 'Deimos' },
    ],
  },
  {
    value: 'marsx',
    label: 'Mars',
    children: [
    { value: 'phobosx', label: 'Phobos' },
    { value: 'deimosx', label: 'Deimos' },
    ],
  },
];

export default () => {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <SelectableTree
      treeNodes={nodes}
      checked={checked}
      onCheck={checked => setChecked(checked)}
    />
  );
};
