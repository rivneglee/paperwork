import React, { FunctionComponent, useState } from 'react';
import { DataSourceSelector, FieldSelector } from '../../DataSourceSelector';
import { SelectOption } from '@paperwork/ui-widgets';

export interface DataSourceOption {
  id: string;
  name: string;
}

interface Props {
  dataSource?: DataSourceOption;
  fieldSelection?: string | string[];
  onBind?: (dataSource: DataSourceOption, fields: SelectOption | SelectOption[]) => void;
  dataSourceLabel?: string;
  dataFieldLabel?: string;
  multipleFields?: boolean;
}

const DataBinding: FunctionComponent<Props> = ({
  dataSource,
  fieldSelection,
  onBind,
  dataSourceLabel = 'Datasource',
  dataFieldLabel = 'Field',
  multipleFields,
}) => {
  const [selectedDataSource, setSelectedDataSource] = useState(dataSource);
  const onSelectDatasource = (selection: DataSourceOption) => {
    setSelectedDataSource(selection);
  };

  const onSelectField = (fields: SelectOption | SelectOption[]) => {
    onBind && onBind(selectedDataSource as DataSourceOption, fields);
  };

  return (
    <>
      <DataSourceSelector
        value={selectedDataSource}
        label={dataSourceLabel}
        labelPlacement="top"
        onChange={onSelectDatasource}
      />
      {
        selectedDataSource && (
          <FieldSelector
            value={fieldSelection}
            dataSourceId={selectedDataSource.id}
            label={dataFieldLabel}
            labelPlacement="top"
            onChange={onSelectField}
            isMultipleSelect={!!multipleFields}
          />
        )
      }
    </>
  );
};

export default DataBinding;
