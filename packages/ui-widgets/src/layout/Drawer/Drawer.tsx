import React, { ReactElement, SyntheticEvent, FunctionComponent } from 'react';
import classNames from 'classnames';

import { Card } from '../Card';
import DrawerHeader from './DrawerHeader';

interface Props {
  isShow: boolean;
  header?: ReactElement<any>;
  footer?: ReactElement<any>;
  onClose?: (e: SyntheticEvent) => void;
  placement?: 'left' | 'right';
}

const Drawer: FunctionComponent<Props> = ({
  isShow,
  onClose,
  header,
  footer,
  children,
  placement = 'left',
}) => (
  <Card
    className={
      classNames(`pw-drawer pw-drawer--${placement}`, { ['pw-drawer--opened']: isShow })
    }
    header={
      <DrawerHeader placement={placement} onClickCloseButton={onClose}>
        {header}
      </DrawerHeader>
    }
    footer={
      footer
    }
  >
    { children }
  </Card>
);

export default Drawer;
