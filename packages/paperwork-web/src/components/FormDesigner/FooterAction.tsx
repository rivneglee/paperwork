import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  label: string;
  onClick?: () => void;
}

const FooterAction: FunctionComponent<Props> = ({ icon, label, onClick }) => (
  <div className="pw-form-designer-footer-action" onClick={onClick}>
    <span className="pw-form-designer-footer-action__icon">
      {icon}
    </span>
    <span className="pw-form-designer-footer-action__label">
        {label}
      </span>
  </div>
);

export default FooterAction;
