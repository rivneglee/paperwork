import React, { FunctionComponent, ReactElement } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

interface Props {
  title: string;
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
  buttons?: ReactElement[];
}

const Modal: FunctionComponent<Props> = ({
  title,
  isOpen,
  className,
  children,
  onClose,
  buttons = [],
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    ariaHideApp={false}
    className={classNames('pw-modal-dialog', className)}
    overlayClassName="pw-modal-dialog__overlay">
    <div className="pw-modal-dialog__header">{title}</div>
    <div className="pw-modal-dialog__content">{children}</div>
    <div className="pw-modal-dialog__footer">
      <div className="pw-modal-dialog__flap pw-modal-dialog__flap--left"></div>
        {
          buttons.map((button, i) =>
            React.cloneElement(button, {
              key: `button_${i}`,
              className: classNames(button.props.className, 'pw-modal-dialog__button'),
            }),
          )
        }
      <div className="pw-modal-dialog__flap pw-modal-dialog__flap--right"></div>
    </div>
  </ReactModal>
);

export default Modal;
