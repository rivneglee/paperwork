import React from 'react';

import { Accordion } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
   <div style={{ width: 500 }}>
     <Accordion>
       <Accordion.Panel header="Panel 1" key="p1">
         <p>This is panel 1</p>
       </Accordion.Panel>
       <Accordion.Panel header="Panel 2" key="p2">
         <p>This is panel 2</p>
       </Accordion.Panel>
     </Accordion>
   </div>
  </div>
);
