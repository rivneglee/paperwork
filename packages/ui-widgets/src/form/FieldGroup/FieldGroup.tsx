import React, { FunctionComponent, ReactElement } from 'react';
import 'react-toggle/style.css';

interface Props {
  label?: ReactElement | string;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
}

const FieldGroup: FunctionComponent<Props> = ({
  label = '',
  isRequired = false,
  children,
  labelAccessory,
}) => (
    <div className="pw-field-group">
      <div className="pw-field-group__label">
        <label>{label}</label>
        <span className="pw-field-group__accessory">
          {labelAccessory}
          {isRequired && <span className="pw-field-group__asterisk">*</span>}
        </span>
      </div>
      <div className="pw-field-group__input">
        {children}
      </div>
    </div>
);

export default FieldGroup;
