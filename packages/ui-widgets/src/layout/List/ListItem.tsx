import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import ListItemIcon from './ListItemIcon';

interface Props {
  icon?: ReactElement<any>;
  onClick?: (e: SyntheticEvent) => void;
}

const ListItem: FunctionComponent<Props> = ({
 children, icon, onClick,
}) => (
  <li className="pw-list-item" onClick={onClick}>
    {icon && (
      <ListItemIcon>
        {icon}
      </ListItemIcon>
    )}
    {children}
  </li>
);

export default ListItem;

export type ListItemComponent = FunctionComponent<Props>;
