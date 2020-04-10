import React, { ReactComponentElement, useState, FunctionComponent } from 'react';
import DropdownItem, { DropdownItemComponent } from './DropdownItem';

interface Props {
  items: ReactComponentElement<DropdownItemComponent>[];
  align?: 'right' | 'left';
}

interface DropdownComponent extends FunctionComponent<Props> {
  Item: DropdownItemComponent;
}

const Dropdown: DropdownComponent = ({ children, items, align = 'left' }) => {
  const [showMenu, setMenuShowState] = useState(false);

  const openMenu = () => setMenuShowState(true);
  const closeMenu = () => setMenuShowState(false);

  const triggerContent = children;

  return (
    <div className="pw-dropdown" onClick={openMenu} onMouseLeave={closeMenu}>
      {triggerContent}
      {
        showMenu && (
          <ul
            className={`pw-dropdown__menu pw-dropdown__menu--${align}`}
            onMouseUp={closeMenu}
            onMouseLeave={closeMenu}
          >
            {items}
          </ul>
        )
      }
    </div>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
