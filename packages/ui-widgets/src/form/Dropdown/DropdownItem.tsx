import React, { ReactComponentElement, SyntheticEvent, FunctionComponent } from 'react';

interface Props {
  icon?: ReactComponentElement<any>;
  onClick?: (e: SyntheticEvent) => void;
}

const DropdownItem: FunctionComponent<Props> = ({ children, onClick, icon }) => (
  <li className="pw-dropdown__item" onClick={onClick}>
    { icon && <span className="pw-dropdown__icon">{icon}</span> }
    <span>{children}</span>
  </li>
);

export default DropdownItem;

export type DropdownItemComponent = FunctionComponent<Props>;
