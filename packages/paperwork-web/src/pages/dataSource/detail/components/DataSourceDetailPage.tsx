import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  Card,
  Input,
  Separator,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar/AppBar';
import { DataSource, Field } from '../../../../schema/DataSource';
import DataSourceDetailModal from './DataSourceDetailModal';
import DataSourceDetailActions from './DataSourceDetailActions';
import FieldsTable from './FieldsTable';

interface Props {
  dataSource: DataSource;
  isPageEdited: boolean;
  onUpdateDetail: (key: string, value: any) => void;
  onUpdateField: (index: number, key: string, value: string) => void;
  onAddField: (newField: Field, key: string, value: any) => void;
  onRemoveField: (index: number) => void;
  onSave: (dataSource: DataSource) => void;
  onDelete: () => void;
  onCancel: () => void;
  onEditGrant?: (fieldId: string) => void;
}

const DataSourceDetailPage: FunctionComponent<Props> = ({
  dataSource,
  isPageEdited,
  onUpdateDetail,
  onAddField,
  onUpdateField,
  onRemoveField,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [modalType, setModalType] = useState('');

  const { id } = dataSource;

  const isCreating = !id;

  const onCloseModal = () => setModalType('');

  const onClickCancel = () => {
    if (isPageEdited) {
      setModalType('unsave');
    } else {
      onCancel();
    }
  };

  const onClickSave = () => onSave(dataSource);

  const onClickDelete = () => setModalType('delete');

  return (
    <BaseTemplate
      header={<AppBar />}
    >
      <Card
        header={
          <h3>Datasource details</h3>
        }>
        <Input
          value={dataSource.name}
          label="Datasource name"
          isRequired
          labelPlacement="top"
          size="s"
          onChange={(e: any) => onUpdateDetail('name', e.target.value)}
        />
        <Separator/>
        <FieldsTable
          onAddField={onAddField}
          onUpdateField={onUpdateField}
          onRemoveField={onRemoveField}
          fields={dataSource.fields}
        />
      </Card>
      <DataSourceDetailActions
        isCreating={isCreating}
        onClickCancel={onClickCancel}
        onClickDelete={onClickDelete}
        onClickSave={onClickSave}
      />
      { modalType && (
          <DataSourceDetailModal
            modalType={modalType}
            onCloseModal={onCloseModal}
            onCancel={onCancel}
            onDelete={onDelete}
          />
       )}
    </BaseTemplate>
  );
};

export default DataSourceDetailPage;
