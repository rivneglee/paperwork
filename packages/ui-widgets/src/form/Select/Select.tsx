import React, { FunctionComponent, ReactElement } from 'react';
import ReactSelect from 'react-select';

import { FieldGroup } from '../FieldGroup';

interface SelectOption {
  value: string | number;
  label: string;
}

type SelectedValue = string | string[] | number | number[] | undefined;

interface Props {
  options: SelectOption[];
  selectedValue?: SelectedValue;
  label?: ReactElement | string;
  disabled?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  isMultipleSelect?: boolean;
  onChange?: (value: SelectedValue) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

const Select: FunctionComponent<Props> = ({
  label,
  isRequired,
  labelAccessory,
  options = [],
  selectedValue,
  isMultipleSelect = false,
  disabled = false,
  onChange,
  size,
}) => {
  let selection = null;
  if (selectedValue instanceof Array) {
    selection = (selectedValue as []).map((
      s => options.find(o => o.value === s)
    ));
  } else {
    selection = options.find(o => o.value === selectedValue);
  }

  const onValueChange = (selection: SelectOption | SelectOption[]) => {
    let currentValue;
    if (selection && (selection as SelectOption).value) {
      currentValue = (selection as SelectOption).value;
    } else if (selection instanceof Array) {
      currentValue = selection.map(s => s.value) as string[];
    }

    if (onChange) {
      onChange(currentValue);
    }
  };

  return (
    <FieldGroup label={label} isRequired={isRequired} labelAccessory={labelAccessory} size={size}>
      <ReactSelect
        isMulti={isMultipleSelect}
        options={options}
        className="pw-select"
        classNamePrefix="pw-select"
        onChange={onValueChange}
        defaultValue={selection}
        isDisabled={disabled}
      />
    </FieldGroup>
  );
};

export default Select;
