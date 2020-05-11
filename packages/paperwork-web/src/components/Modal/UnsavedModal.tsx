import React, { FunctionComponent } from 'react';

import {  Icons, Button, ButtonRow, Modal } from '@paperwork/ui-widgets';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const UnsavedModal: FunctionComponent<Props> = ({ onConfirm, onCancel }) => (
  <Modal
    header={
      <Modal.Header
        icon={<Icons.Confirm />}
        title="Discard unsaved change?"
        subTitle="You've made changes that will be lost if you don't go back and save them."
      />
    }
    isOpen={true}
    footer={
      <Modal.Footer>
        <ButtonRow primary={[
          <Button key="confirm" color="secondary" size="s" onClick={onConfirm}>Yes</Button>,
          <Button key="cancel" size="s" onClick={onCancel}>No</Button>,
        ]}/>
      </Modal.Footer>
    }>
  </Modal>
);

export default UnsavedModal;
