import React, { FunctionComponent, useState } from 'react';

import { FormMode, Input, Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  onChange: (value: any) => void;
}

const TextInput: FunctionComponent<Props> = ({ onChange, id, mode, label, isRequired, labelPlacement, value, ...item }) => {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = () => {
    if (mode === FormMode.EDIT) {
      onChange(inputValue);
    }
  };
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement} isRequired={isRequired}>
      {
        mode === FormMode.READONLY ? (
          <span key={id} className="pwapp-form-text-input--readonly">{value}</span>
        ) : (
          <Input
            key={id}
            isRequired={isRequired}
            value={inputValue}
            {...item}
            onChange={(e: any) => setInputValue(e.target.value)}
            onBlur={handleChange}
          />
        )
      }
    </LabelAccessor>
  );
};

export default TextInput;
