import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  Input,
  LineItemTable,
  Separator,
  Select,
  Icons,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar/AppBar';
import { DataSource, Field } from '../../../../schema/DataSource';
import { UnsavedModal } from '../../../../components/Modal';

interface Props {
  dataSource: DataSource;
  isPageEdited: boolean;
  onUpdateDetail: (key: string, value: any) => void;
  onUpdateField: (index: number, key: string, value: string) => void;
  onAddField: (newField: Field, key: string, value: any) => void;
  onRemoveField: (index: number) => void;
  onSave: (dataSource: DataSource) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
}

const columnsConfig = [
  { columnName: 'Name', style: { width: 200 }, textWrap: 'wrap' },
  { columnName: 'Collaboration', textWrap: 'wrap' },
];

const DataSourceDetailPage: FunctionComponent<Props> = ({
  dataSource,
  isPageEdited,
  onUpdateDetail,
  onAddField,
  onUpdateField,
  onRemoveField,
  onSave,
  onCancel,
}) => {
  const [modalType, setModalType] = useState('');

  const { id } = dataSource;

  const secondaryButtons = id ? [
    <Button key="delete" size="m" color="danger" icon={<Icons.Delete />}>Delete</Button>,
  ] : [];

  const onCloseModal = () => setModalType('');

  const onClickCancel = () => {
    if (isPageEdited) {
      setModalType('unsave');
    } else {
      onCancel();
    }
  };

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
        <LineItemTable
          columnsConfig={columnsConfig}
          data={dataSource.fields}
          onAddRow={onAddField}
          onUpdateRow={onUpdateField}
          onRemoveRow={onRemoveField}
          renderRow={(index, field, onChange) => (
            <LineItemTable.Row columnsConfig={columnsConfig}>
              <LineItemTable.Item>
                <Input value={field.name} onChange={(e: any) => onChange('name', e.target.value)}/>
              </LineItemTable.Item>
              <LineItemTable.Item>
                <Select options={[]} isMultipleSelect />
              </LineItemTable.Item>
            </LineItemTable.Row>
          )}
        />
      </Card>
      <ButtonRow
        primary={[
          <Button
            key="save"
            color="primary"
            size="m"
            icon={<Icons.Save />}
            onClick={() => onSave(dataSource)}
          >
            Save
          </Button>,
          <Button key="cancel" onClick={onClickCancel} size="m" icon={<Icons.Cancel/>}>Cancel</Button>,
        ]}
        secondary={secondaryButtons}
      />
      {modalType === 'unsave' && (
        <UnsavedModal
          onCancel={onCloseModal}
          onConfirm={onCancel}
        />)
      }
    </BaseTemplate>
  );
};

export default DataSourceDetailPage;
