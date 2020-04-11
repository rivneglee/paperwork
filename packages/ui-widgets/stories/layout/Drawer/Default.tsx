import React, { useState } from 'react';

import { Drawer, Icons, List } from '../../../src';

export default () => {
  const [isShow, setIsShow] = useState(false);
  const close = () => setIsShow(false);
  const open = () => setIsShow(true);
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <div onClick={open}>
        <Icons.Menu />
      </div>
      <Drawer header={
        <h3>Paperwork</h3>
      } isShow={isShow} onClose={close}>
        <List>
          <List.Item onClick={close} icon={<Icons.Form />}>
            Forms
          </List.Item>
          <List.Item onClick={close} icon={<Icons.Chart />}>
            Reports
          </List.Item>
        </List>
      </Drawer>
    </div>
  );
};
