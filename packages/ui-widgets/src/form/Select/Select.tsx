import React, { FunctionComponent, ReactElement } from 'react';
import ReactSelect from 'react-select';

import { FieldGroup } from '../FieldGroup';

export interface SelectOption {
  value: string | number;
  label: string;
}

type SelectedValue = string | string[] | number | number[] | undefined;

interface Props {
  options: SelectOption[];
  selectedValue?: SelectedValue;
  label?: ReactElement | string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  isMultipleSelect?: boolean;
  onChange?: (value: SelectedValue, option?: SelectOption | SelectOption[]) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  labelPlacement?: 'left' | 'top';
}

const Select: FunctionComponent<Props> = ({
  label,
  isRequired,
  labelAccessory,
  options = [],
  selectedValue,
  isMultipleSelect = false,
  disabled = false,
  readOnly = false,
  clearable = true,
  onChange,
  size,
  labelPlacement = 'left',
}) => {
  let selection = null;
  if (selectedValue instanceof Array) {
    selection = (selectedValue as any[]).map((
      s => options.find(o => o.value === s)
    ));
  } else {
    selection = options.find(o => o.value === selectedValue);
  }

  const onValueChange = (selection: SelectOption | SelectOption[]) => {
    if (readOnly) return;
    let currentValue;
    if (selection && (selection as SelectOption).value) {
      currentValue = (selection as SelectOption).value;
    } else if (selection instanceof Array) {
      currentValue = selection.map(s => s.value) as string[];
    }

    if (onChange) {
      let newSelection = selection;
      if (isMultipleSelect || !selection) newSelection = [];
      onChange(currentValue, newSelection);
    }
  };

  return (
    <FieldGroup
      label={label}
      isRequired={isRequired}
      labelAccessory={labelAccessory}
      size={size}
      labelPlacement={labelPlacement}
    >
      <ReactSelect
        isMulti={isMultipleSelect}
        isClearable={clearable}
        isSearchable={!readOnly}
        isOptionDisabled={() => readOnly}
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
