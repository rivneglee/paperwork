import React, { FunctionComponent, ReactElement, useState } from 'react';
import classNames from 'classnames';
import Icons from '../../graphic/Icons';
import MenuItem from './MenuItem';

interface Props {
  id: string;
  icon?: ReactElement<any>;
  label: string;
}

const MenuGroup: FunctionComponent<Props> = ({
 children, icon, label, id,
}) => {
  let isActive = false;
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;
    const { active } = element.props;
    if (active) isActive = true;
  });

  const [isOpened, setIsOpened] = useState(isActive);

  return (
    <div className={classNames('pw-menu-group', isOpened && 'pw-menu-group--opened')}>
      <MenuItem id={id} icon={icon} onClick={() => setIsOpened(!isOpened)}>
        <div className="pw-menu-group__root">
          <span>{label}</span>
          <Icons.ArrowRight className="pw-menu-group__expand-btn" />
        </div>
      </MenuItem>
      <div className="pw-menu-group__items">
        {children}
      </div>
    </div>
  );
};

export default MenuGroup;

export type MenuGroupComponent = FunctionComponent<Props>;
