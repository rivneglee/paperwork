import React, { useState } from 'react';

import { Select } from '../../../src';

export default () => {
  const [value, setValue] = useState();
  const colours = [
    { value: 'r', label: 'Red' },
    { value: 'g', label: 'Green' },
    { value: 'b', label: 'Blue' },
  ];

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Select
        options={colours}
        label="Multi select"
        selectedValue={value}
        size="m"
        isMultipleSelect={true}
        onChange={(selection: any) => setValue(selection)} />
    </div>
  );
};
