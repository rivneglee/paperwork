import React, { FunctionComponent } from 'react';
import { Input, Item } from '@paperwork/ui-widgets';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item }) => (
  <>
    <Input
      label="Label"
      value={item.label}
      labelPlacement="top"
      onChange={(e: any) => onUpdate({ ...item, label: e.target.value })}
    />
  </>
);

export default Settings;
