import React, { FunctionComponent } from 'react';
import { Button, ButtonRow, Icons } from '@paperwork/ui-widgets';

interface Props {
  isCreating: boolean;
  onClickSave: () => void;
  onClickCancel: () => void;
  onClickDelete: () => void;
}

const DataSourceDetailActions: FunctionComponent<Props> = ({
  isCreating,
  onClickDelete,
  onClickCancel,
  onClickSave,
}) => {
  const secondaryButtons = isCreating ? [] : [
    <Button key="delete" onClick={onClickDelete} size="m" color="danger" icon={<Icons.Delete />}>Delete</Button>,
  ];

  return (
    <ButtonRow
      primary={[
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
      ]}
      secondary={secondaryButtons}
    />
  );
};

export default DataSourceDetailActions;
