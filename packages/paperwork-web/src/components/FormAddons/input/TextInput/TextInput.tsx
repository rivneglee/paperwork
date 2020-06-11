import React, { FunctionComponent } from 'react';

import { Input, Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  onChange: (value: any) => void;
}

const TextInput: FunctionComponent<Props> = ({ onChange, id, readonly, label, isRequired, labelPlacement, ...item }) => (
  <LabelAccessor label={label} labelPlacement={labelPlacement} isRequired={isRequired}>
    {
      readonly ? (
        <span key={id} className="pwapp-text-input--readonly">{item.value}</span>
      ) : (
        <Input key={id} isRequired={isRequired} {...item} onChange={(e: any) => onChange(e.target.value)}/>
      )
    }
  </LabelAccessor>
);

export default TextInput;