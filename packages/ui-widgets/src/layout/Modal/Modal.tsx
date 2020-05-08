import React, { FunctionComponent, ReactElement } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import ModalHeader, { ModalHeaderComponent } from './ModalHeader';
import ModalFooter, { ModalFooterComponent } from './ModalFooter';

interface Props {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
  footer: ReactElement;
  header: ReactElement;
}

interface ModalComponent extends FunctionComponent<Props>{
  Header: ModalHeaderComponent;
  Footer: ModalFooterComponent;
}

const Modal: ModalComponent = ({
  isOpen,
  className,
  children,
  onClose,
  footer,
  header,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    ariaHideApp={false}
    className={classNames('pw-modal-dialog', className)}
    overlayClassName="pw-modal-dialog__overlay">
    {header}
    {
      children && <div className="pw-modal-dialog__content">{children}</div>
    }
    {footer}
  </ReactModal>
);

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;
