import React, { useState } from 'react';

import { IconButton, Icons, Drawer, List } from '@paperwork/ui-widgets';
import './AppBar.scss';
import appName from './paperwork.png';

const AppBar = () => {
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
      <Drawer header={<h3>MENU</h3>} isShow={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <List>
          <List.Item icon={<Icons.DataSource className="pwapp-appbar__menu-icon"/>}>
            Datasource
          </List.Item>
          <List.Item icon={<Icons.Template className="pwapp-appbar__menu-icon"/>}>
            Template
          </List.Item>
          <List.Item icon={<Icons.Form className="pwapp-appbar__menu-icon"/>}>
            Form
          </List.Item>
          <List.Item icon={<Icons.Chart className="pwapp-appbar__menu-icon"/>}>
            Report
          </List.Item>
        </List>
      </Drawer>
    </div>
  );
};

export default AppBar;
