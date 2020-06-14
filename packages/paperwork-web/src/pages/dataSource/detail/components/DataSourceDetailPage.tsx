import React, { FunctionComponent, useState } from 'react';
import {
  Badge,
  BaseTemplate,
  Card,
  Drawer,
  Input, Scrollable,
  Separator,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { DataSource, Field, Grant } from '../../../../schema/DataSource';
import { ConfirmModal } from '../../../../components/Modal';
import DataSourceDetailActions from './DataSourceDetailActions';
import OwnerFieldsTable from './OwnerFieldsTable';
import FieldGrantsTable from './FieldGrantsTable';

import './DataSourceDetailPage.scss';
import CollaboratorFieldsTable from './CollaboratorFieldsTable';

interface Props {
  dataSource: DataSource;
  isProcessing?: boolean;
  isPageEdited: boolean;
  onUpdateDetail: (key: string, value: any) => void;
  onUpdateField: (index: number, key: string, value: string) => void;
  onAddField: (newField: Field, key: string, value: any) => void;
  onRemoveField: (index: number) => void;
  onSave: (dataSource: DataSource) => void;
  onDelete: () => void;
  onCancel: () => void;
  onEditGrant: (fieldId?: string) => void;
  grantField?: Field;
  onAddGrant: (newGrant: Grant, key: string, value: any) => void;
  onUpdateGrant: (index: number, key: string, value: string) => void;
  onRemoveGrant: (index: number) => void;
  isOwner: boolean;
}

const DataSourceDetailPage: FunctionComponent<Props> = ({
  dataSource,
  isPageEdited,
  isProcessing,
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
  isOwner,
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
      header={<AppBar activeMenuId="datasource" />}
      isProcessing={isProcessing}
      spinner={<Spinner/>}
    >
      <Card
        header={
          <Card.Header primary={
            <>
              Datasource details {
              !isOwner && <Badge color="secondary">Collaborative</Badge>
              }
            </>
          }/>
        }>
        <Input
          value={dataSource.name}
          label="Datasource name"
          isRequired
          labelPlacement="top"
          size="s"
          disabled={!isOwner}
          onChange={(e: any) => onUpdateDetail('name', e.target.value)}
        />
        <Separator/>
        {
          isOwner ? (
            <OwnerFieldsTable
              onAddField={onAddField}
              onUpdateField={onUpdateField}
              onRemoveField={onRemoveField}
              onEditGrant={onEditGrant}
              fields={dataSource.fields}
            />
          ) : (
            <CollaboratorFieldsTable fields={dataSource.fields} />
          )
        }
      </Card>
      <DataSourceDetailActions
        isCreating={isCreating}
        isOwner={isOwner}
        onClickCancel={onClickCancel}
        onClickDelete={onClickDelete}
        onClickSave={onClickSave}
      />
      { modalType && (
          <ConfirmModal
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
