import React, { FunctionComponent, ReactElement, SyntheticEvent, useState } from 'react';
import Cleave from 'cleave.js/react';
import classNames from 'classnames';

import { FieldGroup } from '../FieldGroup';

interface Props {
  value?: string | number;
  label?: ReactElement | string;
  disabled?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  onChange?: (e: SyntheticEvent) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  placeholder?: string;
  options?: object;
  type?: 'outlined' | 'underlined';
  left?: ReactElement;
  right?: ReactElement;
}

const Input: FunctionComponent<Props> = ({
  type = 'outlined',
  value,
  placeholder,
  label,
  isRequired,
  labelAccessory,
  disabled = false,
  options = {},
  onChange,
  size,
  left,
  right,
}) => {
  const [hasFocus, setHasFocus] = useState(false);

  const onInputFocus = () => {
    setHasFocus(true);
  };

  const onInputBlur = () => {
    setHasFocus(false);
  };

  return (
    <FieldGroup label={label} isRequired={isRequired} labelAccessory={labelAccessory} size={size}>
      <div
        className={
          classNames(
            'pw-input',
            hasFocus && 'pw-input--active',
            type && `pw-input--type-${type}`,
          )
        }>
        {
          left && <span className="pw-input__left">{left}</span>
        }
        <Cleave
          className={
            classNames(
              'pw-input__control',
            )
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          options={options}
          disabled={disabled}
        />
        {
          right && <span className="pw-input__right">{right}</span>
        }
      </div>
    </FieldGroup>
  );
};

export default Input;
