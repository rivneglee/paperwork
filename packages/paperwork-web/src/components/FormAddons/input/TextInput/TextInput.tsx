import React, { FunctionComponent, useState } from 'react';

import { FormMode, Input, Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  onChange: (value: any) => void;
}

const TextInput: FunctionComponent<Props> = ({ onChange, id, mode, label, isRequired, labelPlacement, value, ...item }) => {
  const [inputValue, setInputValue] = useState(value);
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
            readOnly={mode !== FormMode.EDIT}
            onBlur={() => onChange(inputValue)}
          />
        )
      }
    </LabelAccessor>
  );
};

export default TextInput;
