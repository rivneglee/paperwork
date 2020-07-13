import React, { useState } from 'react';

import { DatePicker } from '../../../src';

export default () => {
  const [date, setDate] = useState('');
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <DatePicker value={date} onChange={date => setDate(date)}/>
    </div>
  );
};
