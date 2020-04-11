import React, { FunctionComponent, SyntheticEvent } from 'react';
import { IconButton } from '../../form/IconButton';
import Icons from '../../graphic/Icons';

interface Props {
  onClickCloseButton?: (e: SyntheticEvent) => void;
  placement: 'left' | 'right';
}

const DrawerHeader: FunctionComponent<Props> = ({
  children,
  onClickCloseButton,
  placement,
}) => (
  <>
    <div className="pw-drawer-header">
      {children}
    </div>
    <IconButton onClick={onClickCloseButton}>
      {
        placement === 'left' && <Icons.ArrowLeft />
      }
      {
        placement === 'right' && <Icons.ArrowRight />
      }
    </IconButton>
  </>
);

export default DrawerHeader;
