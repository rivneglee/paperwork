import React, { FunctionComponent } from 'react';
import { Item, Toggle } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item }) => {
  const onToggleChange = (key: string) => (e: any) => {
    onUpdate({
      ...item,
      [key]: e.target.checked,
    });
  };
  return (
    <>
      <LabelSettings item={item} onUpdate={onUpdate}/>
      <Toggle
        checked={item.isRequired}
        label="Required"
        labelPlacement="top"
        onChange={onToggleChange('isRequired')}
      />
    </>
  );
};

export default Settings;
