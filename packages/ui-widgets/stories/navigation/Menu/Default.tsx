import React from 'react';

import { Menu, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Menu>
      <Menu.Group id="forms" label="Forms" icon={<Icons.Form/>}>
        <Menu.Item id="my-form">My forms</Menu.Item>
        <Menu.Item active id="submitted-form">Submitted forms</Menu.Item>
      </Menu.Group>
      <Menu.Group id="reports" label="Reports"  icon={<Icons.Chart/>}>
        <Menu.Item id="my-report">My report</Menu.Item>
      </Menu.Group>
      <Menu.Item id="my-datasource" icon={<Icons.DataSource />}>My datasource</Menu.Item>
    </Menu>
  </div>
);
