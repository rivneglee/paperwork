import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Icons } from '@paperwork/ui-widgets';
import { Link } from 'react-router-dom';

import './AppBar.scss';
import { Authentication } from '../../schema/User';
import Notification from './Notification';

interface Props {
  activeMenuId?: string;
  authentication?: Authentication;
  secondaryMenu?: ReactElement;
}

const AppBar: FunctionComponent<Props> = ({ activeMenuId, secondaryMenu }) => {
  return (
    <div className="pwapp-lite-appbar">
      <div className="pwapp-lite-appbar-primary">
        <div className="pwapp-lite-appbar-brand"></div>
        <div className="pwapp-lite-appbar-primary__left">
          <Link to="/templates">
            <Button size="m" icon={<Icons.Template/>} type="link" color="danger">Template</Button>
          </Link>
          <Link to="/forms">
            <Button size="m" icon={<Icons.Form/>} type="link" color="danger">My forms</Button>
          </Link>
          <Link to="/commits">
            <Button size="m" icon={<Icons.Commit/>} type="link" color="danger">My commits</Button>
          </Link>
          <Link to="/reports">
            <Button size="m" icon={<Icons.Chart/>} type="link" color="danger">My reports</Button>
          </Link>
          <Notification/>
        </div>
      </div>
      {secondaryMenu && <div className="pwapp-lite-appbar-secondary">{secondaryMenu}</div>}
    </div>
  );
};

export default AppBar;
