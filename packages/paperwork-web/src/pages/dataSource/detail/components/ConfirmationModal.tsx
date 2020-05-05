import React, { FunctionComponent } from 'react';
import { Modal, Button } from '@paperwork/ui-widgets';

interface Props {
  modalType: string;
  onConfirmCancel: () => void;
  onCloseModal: () => void;
}

const ConfirmationModal: FunctionComponent<Props> = ({
  modalType,
  onConfirmCancel,
  onCloseModal,
}) => {
  const textMapping = {
    unsave: {
      title: 'Are you sure leaving this page?',
      message: 'You\'ve made some changes, do you want to discard them?',
      handle: onConfirmCancel,
    },
  };

  return (
    <Modal title={textMapping[modalType].title} isOpen={true} buttons={[
      <Button onClick={() => textMapping[modalType].handle} size="m">YES</Button>,
      <Button onClick={onCloseModal} size="m">NO</Button>,
    ]}>
      {textMapping[modalType].message}
    </Modal>
  );
};

export default ConfirmationModal;
