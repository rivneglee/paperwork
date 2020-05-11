import React, { useState } from 'react';

import { AutoComplete } from '../../../src';

export default () => {
  const [value, setValue] = useState({ id: 'g', displayName: 'Green' });
  const colours = [
    { id: 'r', displayName: 'Red' },
    { id: 'g', displayName: 'Green' },
    { id: 'b', displayName: 'Blue' },
  ];

  const loadOptions = (inputValue: string): Promise<any[]> => (
    new Promise(resolve => (
        setTimeout(() =>
          resolve(colours.filter(
            c => c.displayName.indexOf(inputValue) !== -1)), 1000)
      ),
    )
  );

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <AutoComplete
        loadOptions={loadOptions}
        label="Auto complete"
        value={value}
        size="m"
        isMultipleSelect={true}
        onChange={(selection: any) => setValue(selection)}
        getOptionLabel={option => option.displayName}
        getOptionValue={option => option.id}
      />
    </div>
  );
};
