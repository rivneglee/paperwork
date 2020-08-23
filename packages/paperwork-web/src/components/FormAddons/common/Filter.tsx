import React, { FunctionComponent } from 'react';
import { Input, LineItemTable, Select } from '@paperwork/ui-widgets';

import { Field } from '../../../schema/DataSource';
import { FilterCondition } from '../../../service/statistic';

interface FilterProps {
  fields: Field[];
  filters: FilterCondition[];
  onFilterChange: (filters: FilterCondition[]) => void;
}

const columnsConfig = [
  { columnName: 'Field', textWrap: 'wrap', style: { width: 170 } },
  { columnName: 'Value', textWrap: 'wrap', style: { width: 130 } },
];

const Filter: FunctionComponent<FilterProps> = ({
  fields = [],
  filters = [],
  onFilterChange,
}) => {
  const fieldOptions = fields.map(({ id, name }) => ({ value: id, label: name }));

  const onAddFilter = (newFilter: FilterCondition, key: string, value: any) => {
    onFilterChange([...filters, { ...newFilter, [key]: value }]);
  };

  const onUpdateFilter = (index: number, key: string, value: string) => {
    onFilterChange(filters.map((f, i) => i === index ? ({ ...f, [key]: value }) : f));
  };

  const onRemoveFilter = (index: number) => {
    onFilterChange(filters.filter((f, i) => i !== index));
  };

  return (
    <LineItemTable
      columnsConfig={columnsConfig}
      data={filters}
      onAddRow={onAddFilter}
      onUpdateRow={onUpdateFilter}
      onRemoveRow={onRemoveFilter}
      renderRow={(index, filter, onChange) => (
        <LineItemTable.Row columnsConfig={columnsConfig}>
          <LineItemTable.Item>
            <Select
              options={fieldOptions}
              selectedValue={filter.filterField}
              onChange={value => onChange('filterField', value)}
            />
          </LineItemTable.Item>
          <LineItemTable.Item>
            <Input
              value={filter.filterValue}
              onChange={(e: any) => onChange('filterValue', e.target.value)}
            />
          </LineItemTable.Item>
        </LineItemTable.Row>
      )}
    />
  );
};

export default Filter;
