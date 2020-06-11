import React, { FunctionComponent } from 'react';

import { Select, Item, SelectOption } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {
  options: SelectOption[];
  isMultipleSelect?: boolean;
  onChange: (value: any) => void;
}

const Combobox: FunctionComponent<Props> = ({ onChange, value, id, readonly, isRequired, label, labelPlacement, ...item }) => (
  <LabelAccessor label={label} labelPlacement={labelPlacement} isRequired={isRequired}>
    <Select disabled={readonly} key={id} selectedValue={value} isRequired={isRequired} {...item} onChange={onChange}/>
  </LabelAccessor>
);

export default Combobox;
