import React, { FunctionComponent } from 'react';
import { Icons, Menu as MenuWidget } from '@paperwork/ui-widgets';
import { Link } from 'react-router-dom';

interface Props {
  activeMenuId: string;
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
    <MenuWidget.Group id="template" icon={<Icons.Template/>} label="Template">
      <MenuWidget.Item
        id="public-templates"
        active={activeMenuId === 'public-templates'}
      >
        <Link to="/public-templates">
          Public templates
        </Link>
      </MenuWidget.Item>
      <MenuWidget.Item
        id="templates"
        active={activeMenuId === 'templates'}
      >
        <Link to="/templates">
          My templates
        </Link>
      </MenuWidget.Item>
    </MenuWidget.Group>
    <MenuWidget.Item id="form" active={activeMenuId === 'form'} icon={<Icons.Form/>}>Form</MenuWidget.Item>
    <MenuWidget.Item id="report" active={activeMenuId === 'report'} icon={<Icons.Chart/>}>Report</MenuWidget.Item>
  </MenuWidget>
);

export default Menu;
