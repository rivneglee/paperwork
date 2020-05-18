import React, { FunctionComponent, useState } from 'react';
import { IconButton, Icons, Drawer, Menu, Button, Scrollable } from '@paperwork/ui-widgets';
import { Link } from 'react-router-dom';

import './AppBar.scss';
import appName from '../../assets/paperwork.png';
import { Authentication } from '../../schema/User';

interface Props {
  activeMenuId: string;
  authentication: Authentication;
}

const AppBar: FunctionComponent<Props> = ({ activeMenuId, authentication }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="pwapp-appbar">
      <div className="pwapp-appbar__left">
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <Icons.Menu />
        </IconButton>
      </div>
      <div className="pwapp-appbar__center">
        <Icons.Logo className="pwapp-appbar__logo"/>
        <img src={appName} height={25} width={150}/>
      </div>
      <Drawer
        header={<h3>MENU</h3>}
        footer={
          <Button
            icon={<Icons.PowerOff/>}
            color="danger"
            type="link"
          >Sign out</Button>
        }
        isShow={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Scrollable>
          <Menu>
          <Menu.Item
            active={activeMenuId === 'datasource'}
            id="datasource"
            icon={<Icons.DataSource/>}
          >
            <Link to="/datasource">
              Datasource
            </Link>
          </Menu.Item>
          <Menu.Group id="template" icon={<Icons.Template/>} label="Template">
            <Menu.Item
              id="template-store"
              active={activeMenuId === 'template-store'}
            >
              <Link to="/templates">
                Public template
              </Link>
            </Menu.Item>
            <Menu.Item id="my-template" active={activeMenuId === 'my-template'}>My template</Menu.Item>
          </Menu.Group>
          <Menu.Item id="form" active={activeMenuId === 'form'} icon={<Icons.Form/>}>Form</Menu.Item>
          <Menu.Item id="report" active={activeMenuId === 'report'} icon={<Icons.Chart/>}>Report</Menu.Item>
        </Menu>
        </Scrollable>
      </Drawer>
    </div>
  );
};

export default AppBar;
