import React, { FunctionComponent } from 'react';
import { Item, SelectOption } from '@paperwork/ui-widgets';

import LabelSettings from '../../common/LabelSettings';
import DataBinding, { DataSourceOption } from '../../common/DataBinding';

interface Props {
  onUpdate: (newItem: Item) => void;
  item: Item;
}

const Settings: FunctionComponent<Props> = ({ onUpdate, item }) => {
  const { dataSources = {} } = item;
  const [sourceDataSource] = Object.values(dataSources);
  const { fields = [], ...dataSource } = sourceDataSource as any || {};

  const fieldIds = fields.map((f: any) => f.id);

  const onBind = (dataSource: DataSourceOption, fields: SelectOption[]) => {
    onUpdate({
      ...item,
      dataSources: {
        [dataSource.id]: {
          ...dataSource,
          fields: fields.map((f: SelectOption) => ({ id: f.value, name: f.label })),
        },
      },
    });
  };

  return (
    <>
      <DataBinding
        onBind={onBind}
        multipleFields
        dataFieldLabel="Display fields"
        fieldSelection={sourceDataSource && fieldIds}
        dataSource={sourceDataSource && dataSource}
      />
      <LabelSettings item={item} onUpdate={onUpdate}/>
    </>
  );
};

export default Settings;
