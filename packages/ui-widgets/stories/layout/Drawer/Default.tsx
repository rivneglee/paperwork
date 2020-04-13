import React, { useState } from 'react';

import { Drawer, Icons, List, IconButton } from '../../../src';

export default () => {
  const [isShow, setIsShow] = useState(false);
  const close = () => setIsShow(false);
  const open = () => setIsShow(true);
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <IconButton onClick={open}>
        <Icons.Menu />
      </IconButton>
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
