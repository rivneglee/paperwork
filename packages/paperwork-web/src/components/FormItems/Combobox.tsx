import React, { FunctionComponent } from 'react';

import { Select, Item, SelectOption } from '@paperwork/ui-widgets';

interface Props extends Item {
  options: SelectOption[];
  isMultipleSelect?: boolean;
  onChange: (value: any) => void;
}

const Combobox: FunctionComponent<Props> = ({ onChange, value, id, ...item }) => (
  <Select key={id} selectedValue={value} {...item} onChange={onChange}/>
);

export default Combobox;
