import React, { FunctionComponent } from 'react';

interface Props {}

const MenuItemIcon: FunctionComponent<Props> = ({
  children,
}) => (
  <div className="pw-menu-item__icon">
    {children}
  </div>
);

export default MenuItemIcon;
