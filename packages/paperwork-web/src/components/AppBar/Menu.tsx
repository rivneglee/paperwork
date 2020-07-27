import React, { FunctionComponent } from 'react';
import { Icons, Menu as MenuWidget } from '@paperwork/ui-widgets';
import { Link } from 'react-router-dom';
import NotificationMenuItem from './NotificationMenuItem';

interface Props {
  activeMenuId?: string;
}

const Menu: FunctionComponent<Props> = ({ activeMenuId }) => (
  <MenuWidget>
    <MenuWidget.Item
      active={activeMenuId === 'datasource'}
      id="datasource"
      icon={<Icons.DataSource/>}
    >
      <Link to="/datasource">
        Datasource
      </Link>
    </MenuWidget.Item>
    <MenuWidget.Item
      id="templates"
      icon={<Icons.Template/>}
      active={activeMenuId === 'templates'}
    >
      <Link to="/templates">
        Templates
      </Link>
    </MenuWidget.Item>
    <MenuWidget.Group id="form" icon={<Icons.Form/>} label="Form">
      <MenuWidget.Item
        id="forms"
        active={activeMenuId === 'forms'}
      >
        <Link to="/forms">
          My forms
        </Link>
      </MenuWidget.Item>
      <MenuWidget.Item
        id="commits"
        active={activeMenuId === 'commits'}
      >
        <Link to="/commits">
          My commits
        </Link>
      </MenuWidget.Item>
    </MenuWidget.Group>
    <MenuWidget.Item id="report" active={activeMenuId === 'report'} icon={<Icons.Chart/>}>Report</MenuWidget.Item>
    <MenuWidget.Item
      id="notifications"
      active={activeMenuId === 'notifications'}
      icon={<Icons.Message/>}
    >
      <NotificationMenuItem/>
    </MenuWidget.Item>
  </MenuWidget>
);

export default Menu;
