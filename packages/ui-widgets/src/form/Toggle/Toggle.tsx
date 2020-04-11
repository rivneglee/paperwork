import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import ReactToggle from 'react-toggle';
import 'react-toggle/style.css';

import { FieldGroup } from '../FieldGroup';

interface Props {
  checked: boolean;
  onChange?: (e: SyntheticEvent) => void;
  label?: ReactElement<any> | string;
  disabled?: boolean;
}

const Toggle: FunctionComponent<Props> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => (
  <FieldGroup label={label}>
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
