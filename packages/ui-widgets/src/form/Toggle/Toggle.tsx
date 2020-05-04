import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import ReactToggle from 'react-toggle';
import 'react-toggle/style.css';

import { FieldGroup } from '../FieldGroup';

interface Props {
  checked: boolean;
  onChange?: (e: SyntheticEvent) => void;
  label?: ReactElement<any> | string;
  disabled?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  labelPlacement?: 'left' | 'top';
}

const Toggle: FunctionComponent<Props> = ({
  checked,
  onChange,
  label,
  disabled = false,
  isRequired = false,
  labelPlacement = 'left',
  labelAccessory,
}) => (
  <FieldGroup
    label={label}
    isRequired={isRequired}
    labelAccessory={labelAccessory}
    labelPlacement={labelPlacement}
  >
    <ReactToggle
      className="pw-toggle"
      disabled={disabled}
      checked={checked}
      icons={{
        unchecked: null,
      }}
      onChange={onChange}
    />
  </FieldGroup>
);

export default Toggle;
