import React, { FunctionComponent, ReactElement } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

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
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  isMultipleSelect?: boolean;
  onChange?: (value: SelectedValue) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  labelPlacement?: 'left' | 'top';
  loadOptions?: (inputValue: string) => Promise<SelectOption[]>;
  noOptionsMessage?: string;
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
  labelPlacement = 'left',
  loadOptions,
  noOptionsMessage,
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

  const getNoOptionsMessage = () => {
    const defaultMessage = loadOptions ? 'Type in keyword to search options' : 'No options';
    return noOptionsMessage || defaultMessage;
  };

  const view = loadOptions ? (
    <AsyncSelect
      isMulti={isMultipleSelect}
      options={options}
      className="pw-select"
      classNamePrefix="pw-select"
      onChange={onValueChange}
      defaultValue={selection}
      isDisabled={disabled}
      loadOptions={loadOptions}
      noOptionsMessage={getNoOptionsMessage}
    />
  ) : (
    <ReactSelect
      isMulti={isMultipleSelect}
      options={options}
      className="pw-select"
      classNamePrefix="pw-select"
      onChange={onValueChange}
      defaultValue={selection}
      isDisabled={disabled}
      noOptionsMessage={getNoOptionsMessage}
    />
  );

  return (
    <FieldGroup
      label={label}
      isRequired={isRequired}
      labelAccessory={labelAccessory}
      size={size}
      labelPlacement={labelPlacement}
    >
      {view}
    </FieldGroup>
  );
};

export default Select;
