import React, { FunctionComponent } from 'react';
import { Input, Item, SelectOption, Table } from '@paperwork/ui-widgets';

interface Props {
  onUpdate: (valueMappings: {[key: string]: number}) => void;
  comboboxItem: Item;
  valueMappings?: {[key:string]: number };
}

const ComboBoxMappings: FunctionComponent<Props> = ({
    onUpdate,
    comboboxItem,
    valueMappings = {},
}) => {
  const { options } = comboboxItem;
  return (
      <Table>
        <Table.Body>
          {
            options.map(({ value }: SelectOption) => (
                <Table.Row>
                  <Table.RowItem columnName="Value">{value}</Table.RowItem>
                  <Table.RowItem columnName="Mapping">
                    <Input
                        value={valueMappings[value]}
                        onChange={(e: any) => onUpdate({ ...valueMappings, [value]: e.target.value })}/>
                  </Table.RowItem>
                </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
  );
};

export default ComboBoxMappings;
