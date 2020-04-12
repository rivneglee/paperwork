import React, { useState } from 'react';

import { Select } from '../../../src';

export default () => {
  const [value, setValue] = useState('r');
  const colours = [
    { value: 'r', label: 'Red' },
    { value: 'g', label: 'Green' },
    { value: 'b', label: 'Blue' },
  ];

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Select
        options={colours}
        label="Single select"
        selectedValue={value}
        size="xs"
        onChange={(selection: any) => setValue(selection.value)} />
    </div>
  );
};
