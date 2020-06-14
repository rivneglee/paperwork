import React, { FunctionComponent, ReactElement } from 'react';
import AsyncSelect from 'react-select/async';

import { FieldGroup } from '../FieldGroup';

interface Props {
  value?: any | any[];
  label?: ReactElement | string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  isMultipleSelect?: boolean;
  onChange?: (value: any | any[]) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  labelPlacement?: 'left' | 'top';
  loadOptions: (inputValue: string) => Promise<any[]>;
  noOptionsMessage?: string;
  getOptionLabel?: (option: any) => any;
  getOptionValue?: (option: any) => any;
}

const AutoComplete: FunctionComponent<Props> = ({
  label,
  isRequired,
  labelAccessory,
  value = [],
  isMultipleSelect = false,
  disabled = false,
  readOnly = false,
  clearable = true,
  onChange,
  size,
  labelPlacement = 'left',
  loadOptions,
  noOptionsMessage,
  getOptionLabel,
  getOptionValue,
}) => {
  const getNoOptionsMessage = ({ inputValue }: any) => {
    if (inputValue) {
      return noOptionsMessage || 'No records found';
    }
    return null;
  };

  const options = value instanceof Array ? value : [value];

  return (
    <FieldGroup
      label={label}
      isRequired={isRequired}
      labelAccessory={labelAccessory}
      size={size}
      labelPlacement={labelPlacement}
    >
      <AsyncSelect
        isMulti={isMultipleSelect}
        isSearchable={!readOnly}
        isClearable={clearable}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        placeholder=""
        className="pw-select"
        classNamePrefix="pw-select"
        onChange={onChange}
        defaultValue={value}
        isDisabled={disabled}
        loadOptions={loadOptions}
        components={{ DropdownIndicator:() => null }}
        noOptionsMessage={getNoOptionsMessage}
      />
    </FieldGroup>
  );
};

export default AutoComplete;
