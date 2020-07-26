import React, { FunctionComponent } from 'react';

import { Select, Item, SelectOption, FormMode } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  options: SelectOption[];
  isMultipleSelect?: boolean;
  onChange: (value: any) => void;
}

const Combobox: FunctionComponent<Props> = ({ onChange, value, id, mode, isRequired, label, labelPlacement, ...item }) => {
  const handleChange = (value: any) => {
    if (mode === FormMode.EDIT) {
      onChange(value);
    }
  };
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement} isRequired={isRequired}>
      <Select
        disabled={mode === FormMode.READONLY}
        key={id}
        selectedValue={value}
        isRequired={isRequired}
        {...item}
        onChange={handleChange}
      />
    </LabelAccessor>
  );
};

export default Combobox;
