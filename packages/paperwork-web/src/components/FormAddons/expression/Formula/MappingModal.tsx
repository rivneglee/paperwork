import React, { FunctionComponent, useState } from 'react';
import { Button, ButtonRow, Input, Modal, SelectOption, Table } from '@paperwork/ui-widgets';

interface Props {
  item: any;
  valuesMapping?: any;
  onSave: (mapping: object) => void;
  onCancel: () => void;
}

const MappingModal: FunctionComponent<Props> = ({
  item,
  valuesMapping = {},
  onSave,
  onCancel,
}) => {
  const { options = [] } = item;
  const [mapping, setMapping] = useState(valuesMapping);
  const handleMappingChange = (key: string | number) => (e: any) => {
    setMapping({
      ...mapping,
      [key]: Number(e.target.value),
    });
  };
  return (
      <Modal
          isOpen
          header={
              <Modal.Header
                  title="Field Mapping"
                  subTitle="Mapping value to calculation variable"
              />
          }
          footer={
              <Modal.Footer>
                  <ButtonRow primary={[
                    <Button key="cancel" size="s" onClick={onCancel}>CANCEL</Button>,
                    <Button key="confirm" color="secondary" size="s" onClick={() => onSave(mapping)}>OK</Button>,
                  ]}/>
              </Modal.Footer>
          }
      >
          <Table>
              <Table.Body>
                  {
                      options.map(({ value }: SelectOption) => (
                          <Table.Row>
                              <Table.RowItem columnName="Value">{value}</Table.RowItem>
                              <Table.RowItem columnName="Mapping">
                                  <Input
                                      value={mapping[value]}
                                      onChange={handleMappingChange(value)}
                                  />
                              </Table.RowItem>
                          </Table.Row>
                      ))
                  }
              </Table.Body>
          </Table>
      </Modal>
  );
};

export default MappingModal;
