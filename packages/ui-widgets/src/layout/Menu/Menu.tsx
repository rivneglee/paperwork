import React, { FunctionComponent } from 'react';
import MenuItem, { MenuItemComponent } from './MenuItem';
import MenuGroup, { MenuGroupComponent } from './MenuGroup';

interface Props {}

interface MenuComponent extends FunctionComponent<Props> {
  Item: MenuItemComponent;
  Group: MenuGroupComponent;
}

const Menu: MenuComponent = ({
 children,
}) => (
  <nav className="pw-menu">
    {children}
  </nav>
);

Menu.Item = MenuItem;
Menu.Group = MenuGroup;

export default Menu;
