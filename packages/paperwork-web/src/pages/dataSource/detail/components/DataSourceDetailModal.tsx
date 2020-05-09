import React, { FunctionComponent } from 'react';

import { DeleteModal, UnsavedModal } from '../../../../components/Modal';

interface Props {
  modalType: string;
  onCloseModal: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const DataSourceDetailModal: FunctionComponent<Props> = ({
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

export default DataSourceDetailModal;
