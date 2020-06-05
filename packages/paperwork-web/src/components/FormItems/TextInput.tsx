import React, { FunctionComponent } from 'react';

import { Input, Item } from '@paperwork/ui-widgets';

interface Props extends Item {
  onChange: (value: any) => void;
}

const TextInput: FunctionComponent<Props> = ({ onChange, id, ...item }) => (
  <Input key={id} {...item} onChange={(e: any) => onChange(e.target.value)}/>
);

export default TextInput;
