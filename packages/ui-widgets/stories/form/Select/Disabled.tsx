import React from 'react';

import { Select } from '../../../src';

export default () => {
  const colours = [
    { value: 'r', label: 'Red' },
    { value: 'g', label: 'Green' },
    { value: 'b', label: 'Blue' },
  ];

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Select
        options={colours}
        label="Disabled"
        selectedValue={'r'}
        size="xs"
        disabled />
    </div>
  );
};
