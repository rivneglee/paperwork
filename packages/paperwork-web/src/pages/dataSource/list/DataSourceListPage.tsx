import React from 'react';
import { Card, List, Badge } from '@paperwork/ui-widgets';

const DataSourceListPage = () => (
  <div>
    <Card header={<h3>My Datasource</h3>}>
      <List>
        <List.Item>Datasource 1 <Badge color="secondary">Shared</Badge></List.Item>
        <List.Item>Datasource 2</List.Item>
      </List>
    </Card>
    <Card header={<h3>Collaborative Datasource</h3>}>
      <List>
        <List.Item>Datasource 3</List.Item>
        <List.Item>Datasource 4</List.Item>
      </List>
    </Card>
  </div>
);

export default DataSourceListPage;
