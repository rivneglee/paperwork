import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import 'react-toggle/style.css';

interface Props {
  label?: ReactElement | string;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | undefined;
  labelPlacement?: 'left' | 'top';
}

const FieldGroup: FunctionComponent<Props> = ({
  label = '',
  isRequired = false,
  children,
  labelAccessory,
  labelPlacement = 'left',
  size,
}) => (
    <div className={classNames('pw-field-group', labelPlacement && `pw-field-group--place-${labelPlacement}`)}>
      {
        label && (
          <div className="pw-field-group__label">
            <label>{label}</label>
            <span className="pw-field-group__accessory">
              {labelAccessory}
              {isRequired && <span className="pw-field-group__asterisk">*</span>}
             </span>
          </div>
        )
      }
      <div className={classNames(
        'pw-field-group__input',
        !label && 'pw-field-group__input--full',
        size && `pw-field-group__input--${size}`,
      )}>
        {children}
      </div>
    </div>
);

export default FieldGroup;
