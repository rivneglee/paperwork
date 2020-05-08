import React, { FunctionComponent } from 'react';
import { Separator } from '../../graphic/Separator';

interface Props {}

export type ModalFooterComponent = FunctionComponent<Props>;

const ModalFooter: ModalFooterComponent = ({
  children,
}) => (
  <div className="pw-modal-dialog__footer">
    <Separator />
    {children}
  </div>
);

export default ModalFooter;
