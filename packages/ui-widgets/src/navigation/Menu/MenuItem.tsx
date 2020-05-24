import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import MenuItemIcon from './MenuItemIcon';

interface Props {
  id: string;
  active?: boolean;
  icon?: ReactElement<any>;
  onClick?: (id: string) => void;
}

const MenuItem: FunctionComponent<Props> = ({
 id,
 children,
 icon,
 onClick,
 active,
}) => (
  <div
    id={id}
    className={classNames(
      'pw-menu-item',
      active && 'pw-menu-item--active',
    )}
    onClick={() => onClick && onClick(id)}
  >
    <MenuItemIcon>
      {icon}
    </MenuItemIcon>
    {children}
  </div>
);

export default MenuItem;

export type MenuItemComponent = FunctionComponent<Props>;
