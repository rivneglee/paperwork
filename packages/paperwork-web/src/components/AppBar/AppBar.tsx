import React, { FunctionComponent, ReactElement, useState } from 'react';
import { IconButton, Icons, Drawer, Button, Scrollable } from '@paperwork/ui-widgets';

import './AppBar.scss';
import { Authentication } from '../../schema/User';
import Menu from './Menu';
import Actions from './Actions';
const appName = require('../../assets/paperwork.png');

interface Props {
  activeMenuId?: string;
  authentication?: Authentication;
  secondaryMenu?: ReactElement;
}

const AppBar: FunctionComponent<Props> = ({ activeMenuId, secondaryMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="pwapp-appbar">
      <div className="pwapp-appbar-primary">
        <div className="pwapp-appbar-primary__left">
          <IconButton onClick={() => setIsMenuOpen(true)}>
            <Icons.Menu />
          </IconButton>
        </div>
        <div className="pwapp-appbar-primary__center">
          <Icons.Logo className="pwapp-appbar-primary__logo"/>
          <img src={appName} height={25} width={150}/>
        </div>
        <div className="pwapp-appbar-primary__right">
          <Actions/>
        </div>
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
      {secondaryMenu && <div className="pwapp-appbar-secondary">{secondaryMenu}</div>}
    </div>
  );
};

export default AppBar;
