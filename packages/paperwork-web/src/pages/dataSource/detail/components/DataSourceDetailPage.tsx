import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  Card,
  Drawer,
  Input, Scrollable,
  Separator,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar/AppBar';
import { DataSource, Field, Grant } from '../../../../schema/DataSource';
import DataSourceDetailModal from './DataSourceDetailModal';
import DataSourceDetailActions from './DataSourceDetailActions';
import FieldsTable from './FieldsTable';
import FieldGrantsTable from './FieldGrantsTable';

import './DataSourceDetailPage.scss';

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
  onEditGrant: (fieldId?: string) => void;
  grantField: Field;
  onAddGrant: (newGrant: Grant, key: string, value: any) => void;
  onUpdateGrant: (index: number, key: string, value: string) => void;
  onRemoveGrant: (index: number) => void;
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
  onEditGrant,
  onAddGrant,
  onUpdateGrant,
  onRemoveGrant,
  grantField,
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

  const onCloseDrawer = () => onEditGrant();

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
          onEditGrant={onEditGrant}
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
      <Drawer
        placement="right"
        header={<h3>Permission</h3>}
        isShow={!!grantField}
        onClose={onCloseDrawer}
      >
        <Scrollable className="pwapp-field-grants-table">
          {grantField && (
            <FieldGrantsTable
              field={grantField}
              onAddGrant={onAddGrant}
              onUpdateGrant={onUpdateGrant}
              onRemoveGrant={onRemoveGrant}
            />
          )}
        </Scrollable>
      </Drawer>
    </BaseTemplate>
  );
};

export default DataSourceDetailPage;
