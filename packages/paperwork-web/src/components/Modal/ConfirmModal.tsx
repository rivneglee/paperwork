import React, { FunctionComponent } from 'react';
import UnsavedModal from './UnsavedModal';
import DeleteModal from './DeleteModal';

interface Props {
  modalType: string;
  onCloseModal: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const ConfirmModal: FunctionComponent<Props> = ({
 modalType,
 onCloseModal,
 onCancel,
 onDelete,
}) => {
  const modal = {
    unsave: (
      <UnsavedModal
        onCancel={onCloseModal}
        onConfirm={onCancel}
      />
    ),
    delete: (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={() => {
          onCloseModal();
          onDelete();
        }}
      />
    ),
  }[modalType];

  return modal;
};

export default ConfirmModal;
