import React, { useState } from 'react';

import { Modal, Button } from '../../../src';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Button color="primary" type="outlined" onClick={() => setIsOpen(true)}>
        Open modal
      </Button>
      <Modal title="Save your changes?" isOpen={isOpen} buttons={[
        <Button onClick={() => setIsOpen(false)} size="m">YES</Button>,
        <Button onClick={() => setIsOpen(false)} size="m">NO</Button>,
        <Button onClick={() => setIsOpen(false)} size="m">CANCEL</Button>,
      ]}>
        You've made some changes, do you want to save it?
      </Modal>
    </div>
  );
};
