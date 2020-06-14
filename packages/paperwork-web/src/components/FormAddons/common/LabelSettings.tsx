import React, { FunctionComponent } from 'react';
import { Input, Item, Select } from '@paperwork/ui-widgets';

interface LabelProps {
  item: Item;
  onUpdate: (newItem: Item) => void;
}

const LabelSettings: FunctionComponent<LabelProps> = ({
  item,
  onUpdate,
}) => {
  const { label, labelPlacement = 'top' } = item;
  return (
    <>
      <Input
        label="Label"
        value={label}
        labelPlacement="top"
        onChange={(e: any) => onUpdate({ ...item, label: e.target.value })}
      />
      <Select
        label="Placement"
        selectedValue={labelPlacement}
        labelPlacement="top"
        onChange={labelPlacement => onUpdate({ ...item, labelPlacement })}
        options={[
          { value: 'top', label: 'Top' },
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
          { value: 'bottom', label: 'Bottom' },
        ]}
      />
    </>
  );
};

export default LabelSettings;
