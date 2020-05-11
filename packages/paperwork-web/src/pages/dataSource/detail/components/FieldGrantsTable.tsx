import React, { FunctionComponent } from 'react';
import { Select, LineItemTable } from '@paperwork/ui-widgets';

import { Field, Grant, GrantLevel } from '../../../../schema/DataSource';
import CollaboratorSelector from '../../../../components/CollaboratorSelector/CollaboratorSelector';

interface Props {
  field: Field;
  onAddGrant: (newGrant: Grant, key: string, value: any) => void;
  onUpdateGrant: (index: number, key: string, value: string) => void;
  onRemoveGrant: (index: number) => void;
}

const columnsConfig = [
  { columnName: 'Collaborator', textWrap: 'wrap', style: { width: 170 } },
  { columnName: 'Access', textWrap: 'wrap', style: { width: 130 } },
];

const grantLevelOptions = [
  { label: 'Read', value: GrantLevel.READ },
  { label: 'Write', value: GrantLevel.WRITE },
  { label: 'Full', value: GrantLevel.READ_AND_WRITE },
];

const FieldGrantsTable: FunctionComponent<Props> = ({
  field,
  onAddGrant,
  onUpdateGrant,
  onRemoveGrant,
}) => {
  const { grants } = field;
  return (
    <LineItemTable
      columnsConfig={columnsConfig}
      data={grants}
      onAddRow={onAddGrant}
      onUpdateRow={onUpdateGrant}
      onRemoveRow={onRemoveGrant}
      renderRow={(index, grant, onChange) => (
        <LineItemTable.Row columnsConfig={columnsConfig}>
          <LineItemTable.Item>
            <CollaboratorSelector
              value={grant.collaborator}
              onChange={(selection: any) => (
                onChange('collaborator', selection)
              )}
            />
          </LineItemTable.Item>
          <LineItemTable.Item>
            <Select
              selectedValue={grant.grantLevel}
              options={grantLevelOptions}
              disabled={index === grants.length}
              onChange={(value: any) => (
                onChange('grantLevel', value)
              )}
            />
          </LineItemTable.Item>
        </LineItemTable.Row>
      )}
    />
  );
};

export default FieldGrantsTable;
