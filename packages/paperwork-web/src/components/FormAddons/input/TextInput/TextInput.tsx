import React, { FunctionComponent } from 'react';

import { FormMode, Input, Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  onChange: (value: any) => void;
}

const TextInput: FunctionComponent<Props> = ({ onChange, id, mode, label, isRequired, labelPlacement, ...item }) => (
  <LabelAccessor label={label} labelPlacement={labelPlacement} isRequired={isRequired}>
    {
      mode === FormMode.READONLY ? (
        <span key={id} className="pwapp-form-text-input--readonly">{item.value}</span>
      ) : (
        <Input key={id} isRequired={isRequired} {...item} onChange={(e: any) => onChange(e.target.value)}/>
      )
    }
  </LabelAccessor>
);

export default TextInput;
