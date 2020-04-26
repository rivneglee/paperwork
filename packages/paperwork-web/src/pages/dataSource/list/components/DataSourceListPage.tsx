import React, { FunctionComponent } from 'react';
import { Card, List } from '@paperwork/ui-widgets';
import { DataSourceList } from '../../../../schema/DataSource';

interface Props {
  dataSourceList: DataSourceList;
}

const DataSourceListPage: FunctionComponent<Props> = ({ dataSourceList = [] }) => (
  <div>
    <Card header={<h3>My Datasource</h3>}>
      <List>
        {
          dataSourceList.map(({ name, id }) => (
            <List.Item key={id}>{name}</List.Item>
          ))
        }
      </List>
    </Card>
  </div>
);

export default DataSourceListPage;
