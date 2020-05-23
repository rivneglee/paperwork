import React, { FunctionComponent, useState } from 'react';
import { IconButton, Icons, Drawer, Button, Scrollable } from '@paperwork/ui-widgets';

import './AppBar.scss';
import appName from '../../assets/paperwork.png';
import { Authentication } from '../../schema/User';
import Menu from './Menu';

interface Props {
  activeMenuId: string;
  authentication: Authentication;
}

const AppBar: FunctionComponent<Props> = ({ activeMenuId }) => {
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
          <Menu activeMenuId={activeMenuId}/>
        </Scrollable>
      </Drawer>
    </div>
  );
};

export default AppBar;
