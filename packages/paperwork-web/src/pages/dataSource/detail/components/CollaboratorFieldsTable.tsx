import React, { FunctionComponent } from 'react';
import { Table } from '@paperwork/ui-widgets';

import { Field, GrantLevel } from '../../../../schema/DataSource';

interface Props {
  fields: Field[];
}

const grantLevelMapping = {
  [GrantLevel.READ_AND_WRITE]: 'Full',
  [GrantLevel.READ]: 'Read only',
  [GrantLevel.WRITE]: 'Write only',
};

const CollaboratorFieldsTable: FunctionComponent<Props> = ({
  fields = [],
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem>Name</Table.HeaderItem>
      <Table.HeaderItem>Access</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      {
        fields.map(field => (
          <Table.Row>
            <Table.RowItem columnName="Name">{field.name}</Table.RowItem>
            <Table.RowItem columnName="Access">{grantLevelMapping[field.grants[0].level]}</Table.RowItem>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

export default CollaboratorFieldsTable;
