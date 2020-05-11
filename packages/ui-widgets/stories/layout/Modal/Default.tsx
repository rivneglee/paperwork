import React, { useState } from 'react';

import { Modal, Button, ButtonRow, Icons } from '../../../src';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Button color="primary" type="outlined" onClick={() => setIsOpen(true)}>
        Open modal
      </Button>
      <Modal
        header={
          <Modal.Header
            icon={<Icons.Confirm />}
            title="Discard unsaved change?"
            subTitle="You've made changes that will be lost if you don't go back and save them."
          />
        }
        isOpen={isOpen}
        footer={
          <Modal.Footer>
            <ButtonRow primary={[
              <Button color="primary" size="s" onClick={() => setIsOpen(false)}>Yes</Button>,
              <Button size="s" onClick={() => setIsOpen(false)}>No</Button>,
            ]}/>
          </Modal.Footer>
        }>
      </Modal>
    </div>
  );
};
