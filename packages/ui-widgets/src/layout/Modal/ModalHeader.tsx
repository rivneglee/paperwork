import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  icon?: ReactElement;
  title: string | ReactElement;
  subTitle?: string | ReactElement;
}

export type ModalHeaderComponent = FunctionComponent<Props>;

const ModalHeader: ModalHeaderComponent = ({
  title,
  subTitle,
  icon,
}) => (
  <div className="pw-modal-dialog__header">
    <div className="pw-modal-dialog__title">
      {
        icon && <span className="pw-modal-dialog__header-icon">{icon}</span>
      }
      {title}
    </div>
    {
      subTitle && <div className="pw-modal-dialog__sub-title">{subTitle}</div>
    }
  </div>
);

export default ModalHeader;
