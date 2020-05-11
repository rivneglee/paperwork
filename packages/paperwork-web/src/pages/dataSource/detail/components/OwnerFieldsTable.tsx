import React, { FunctionComponent } from 'react';
import { Badge, Button, Input, LineItemTable } from '@paperwork/ui-widgets';

import { Field } from '../../../../schema/DataSource';

interface Props {
  fields: Field[];
  onUpdateField: (index: number, key: string, value: string) => void;
  onAddField: (newField: Field, key: string, value: any) => void;
  onRemoveField: (index: number) => void;
  onEditGrant: (fieldId?: string) => void;
}

const columnsConfig = [
  { columnName: 'Name', textWrap: 'wrap' },
  { columnName: 'Collaboration', textWrap: 'wrap', style: { width: 200 } },
];

const OwnerFieldsTable: FunctionComponent<Props> = ({
  fields = [],
  onAddField,
  onUpdateField,
  onRemoveField,
  onEditGrant,
}) => (
  <LineItemTable
    columnsConfig={columnsConfig}
    data={fields}
    onAddRow={onAddField}
    onUpdateRow={onUpdateField}
    onRemoveRow={onRemoveField}
    renderRow={(index, field, onChange) => (
      <LineItemTable.Row columnsConfig={columnsConfig}>
        <LineItemTable.Item>
          <Input value={field.name} onChange={(e: any) => onChange('name', e.target.value)}/>
        </LineItemTable.Item>
        <LineItemTable.Item>
          {
            index !== fields.length && (
              <>
                <Badge>{`${field.grants.length} collaborators`}</Badge>
                <Button
                  type="link"
                  color="primary"
                  onClick={() => onEditGrant(field.id)}
                >Manage</Button>
              </>
            )
          }
        </LineItemTable.Item>
      </LineItemTable.Row>
    )}
  />
);

export default OwnerFieldsTable;
