import React, { FunctionComponent } from 'react';
import { BaseTemplate, Button, ButtonRow, Card, Input, LineItemTable, Separator } from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar/AppBar';

import './DataSourceDetailPage.scss';
import { DataSource } from '../../../../schema/DataSource';

interface Props {
  dataSource: DataSource;
}

const columnsConfig = [
  { columnName: 'Name' },
];

const DataSourceDetailPage: FunctionComponent<Props> = ({ dataSource }) => (
  <BaseTemplate
    header={<AppBar />}
  >
    <Card
      header={
        <h3>Datasource details</h3>
      }>
      <Input label="Datasource name" isRequired labelPlacement="top" size="s"/>
      <Separator/>
      <LineItemTable
        columnsConfig={columnsConfig}
        data={dataSource.fields}
        renderRow={(index, field) => (
          <LineItemTable.Row columnsConfig={columnsConfig}>
            <LineItemTable.Item>
              <Input value={field.name} />
            </LineItemTable.Item>
          </LineItemTable.Row>
        )}
      />
    </Card>
    <ButtonRow
      primary={[
        <Button color="primary" size="m">Save</Button>,
        <Button size="m">Cancel</Button>,
      ]}
      secondary={[
        <Button size="m">Delete</Button>,
      ]}
    />
  </BaseTemplate>
);

export default DataSourceDetailPage;
