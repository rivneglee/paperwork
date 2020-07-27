import React, { FunctionComponent } from 'react';
import { Badge, Table } from '@paperwork/ui-widgets';

import { Commit } from '../../../../schema/Commit';

interface Props {
  entries: Commit[];
  onView: (formId: string, commitId: string) => void;
}

const UserCommitListTable: FunctionComponent<Props> = ({
  entries,
  onView,
}) => (
  <Table className="pwapp-user-commit-list">
    <Table.Header>
      <Table.HeaderItem>Form name</Table.HeaderItem>
      <Table.HeaderItem>Form owner</Table.HeaderItem>
      <Table.HeaderItem>Date</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      {
        entries.map(entry => (
          <Table.Row key={entry.id} onClick={() => onView(entry.sourceFormId, entry.id)}>
            <Table.RowItem columnName="Form name">
              {entry.name}
            </Table.RowItem>
            <Table.RowItem columnName="Form owner">
              {entry.collector.displayName}
            </Table.RowItem>
            <Table.RowItem columnName="Date" className="pwapp-user-commit-list__date">
              <Badge color="secondary">
                {entry.createdAt}
              </Badge>
            </Table.RowItem>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

export default UserCommitListTable;
