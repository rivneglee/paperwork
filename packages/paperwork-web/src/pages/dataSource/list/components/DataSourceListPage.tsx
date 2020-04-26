import React, { FunctionComponent } from 'react';
import { List, BaseTemplate, Card } from '@paperwork/ui-widgets';
import { DataSourceList } from '../../../../schema/DataSource';
import AppBar from '../../../../components/AppBar/AppBar';

interface Props {
  dataSourceList: DataSourceList;
}

const DataSourceListPage: FunctionComponent<Props> = ({ dataSourceList = [] }) => (
  <BaseTemplate
    header={<AppBar />}
  >
    <Card header={<h3>My Datasource</h3>}>
      <List>
        {
          dataSourceList.map(({ name, id }) => (
            <List.Item key={id}>{name}</List.Item>
          ))
        }
      </List>
    </Card>
  </BaseTemplate>
);

export default DataSourceListPage;
