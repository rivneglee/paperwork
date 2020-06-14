import React, { FunctionComponent, useState } from 'react';
import { DataSourceSelector, FieldSelector } from '../../DataSourceSelector';

interface DataSourceOption {
  id: string;
  name: string;
}

interface Props {
  dataSource?: DataSourceOption;
  fieldId?: string;
  onBind?: (dataSourceId: string, fieldId: string) => void;
}

const DataBinding: FunctionComponent<Props> = ({
  dataSource,
  fieldId,
  onBind,
}) => {
  const dsId = dataSource ? dataSource.id : '';
  const [dataSourceId, setDataSourceId] = useState(dsId);
  const onSelectDatasource = (selection: DataSourceOption) => {
    const newDataSourceId = selection ? selection.id : '';
    setDataSourceId(newDataSourceId);
  };

  const onSelectField = (fieldId: string) => {
    onBind && onBind(dataSourceId, fieldId);
  };

  return (
    <>
      <DataSourceSelector
        value={dataSource}
        label="Target datasource"
        labelPlacement="top"
        onChange={onSelectDatasource}
      />
      {
        dataSourceId && (
          <FieldSelector
            value={fieldId}
            dataSourceId={dataSourceId}
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
