import React, { FunctionComponent, useState } from 'react';
import { DataSourceSelector, FieldSelector } from '../../DataSourceSelector';

export interface DataSourceOption {
  id: string;
  name: string;
}

interface Props {
  dataSource?: DataSourceOption;
  fieldId?: string;
  onBind?: (dataSource: DataSourceOption, fieldId: string) => void;
}

const DataBinding: FunctionComponent<Props> = ({
  dataSource,
  fieldId,
  onBind,
}) => {
  const [selectedDataSource, setSelectedDataSource] = useState(dataSource);
  const onSelectDatasource = (selection: DataSourceOption) => {
    setSelectedDataSource(selection);
  };

  const onSelectField = (fieldId: string) => {
    onBind && onBind(selectedDataSource as DataSourceOption, fieldId as string);
  };

  return (
    <>
      <DataSourceSelector
        value={selectedDataSource}
        label="Target datasource"
        labelPlacement="top"
        onChange={onSelectDatasource}
      />
      {
        selectedDataSource && (
          <FieldSelector
            value={fieldId}
            dataSourceId={selectedDataSource.id}
            label="Target field"
            labelPlacement="top"
            onChange={onSelectField}
          />
        )
      }
    </>
  );
};

export default DataBinding;
