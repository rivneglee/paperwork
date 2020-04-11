import React, { FunctionComponent, ReactElement } from 'react';
import 'react-toggle/style.css';

interface Props {
  label?: ReactElement<any> | string;
}

const FieldGroup: FunctionComponent<Props> = ({
  label,
  children,
}) => (
  <div className="pw-field-group">
    <div className="pw-field-group__label">
      {label}
    </div>
    <div className="pw-field-group__input">
      {children}
    </div>
  </div>
);

export default FieldGroup;
