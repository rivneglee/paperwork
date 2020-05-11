import React, { FunctionComponent } from 'react';
import { Button, ButtonRow, Icons } from '@paperwork/ui-widgets';

interface Props {
  isCreating: boolean;
  isOwner: boolean;
  onClickSave: () => void;
  onClickCancel: () => void;
  onClickDelete: () => void;
}

const DataSourceDetailActions: FunctionComponent<Props> = ({
  isCreating,
  onClickDelete,
  onClickCancel,
  onClickSave,
  isOwner,
}) => {
  const secondaryButtons = isCreating || !isOwner ? [] : [
    <Button key="delete" onClick={onClickDelete} size="m" color="danger" icon={<Icons.Delete />}>Delete</Button>,
  ];

  const primaryButtons = isOwner ? [
    <Button
      key="save"
      color="primary"
      size="m"
      icon={<Icons.Save />}
      onClick={onClickSave}
    >
      Save
    </Button>,
    <Button key="cancel" onClick={onClickCancel} size="m" icon={<Icons.Cancel/>}>Cancel</Button>,
  ] : [
    <Button key="cancel" onClick={onClickCancel} size="m" icon={<Icons.Cancel/>}>Cancel</Button>,
  ];

  return (
    <ButtonRow
      primary={primaryButtons}
      secondary={secondaryButtons}
    />
  );
};

export default DataSourceDetailActions;
