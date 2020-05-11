import React, { FunctionComponent, ReactElement } from 'react';
import shortid from 'shortid';

import { Table } from '../Table';
import Icons from '../../graphic/Icons';

import LineItemTableRow, { LineItemTableRowComponent, LineItemTableColumnConfig } from './LineItemTableRow';
import LineItemTableRowItem, { LineItemTableRowItemComponent } from './LineItemTableRowItem';
import { IconButton } from '../../form/IconButton';

interface Props {
  data: any[];
  columnsConfig: LineItemTableColumnConfig[];
  renderRow: (index: number, rowData: any, onUpdateRow: (...args: any) => void) => ReactElement;
  onUpdateRow?: (index: number, ...args: any) => void;
  onAddRow?: (...args: any) => void;
  onRemoveRow?: (index: number) => void;
}

interface LineItemTableComponent extends FunctionComponent<Props> {
  Row: LineItemTableRowComponent;
  Item: LineItemTableRowItemComponent;
}

const LineItemTable: LineItemTableComponent = ({
 children,
 data,
 columnsConfig,
 renderRow,
 onUpdateRow,
 onAddRow,
 onRemoveRow,
}) => {
  data.forEach((row: any) => {
    if (!row.id) {
      row.id = shortid.generate();
    }
  });

  const newRow = { id: shortid.generate() };

  const rows = [...data, newRow];

  const onChange = (index: number, rowData: any, ...args: any) => {
    if (index === data.length) {
      onAddRow && onAddRow(rowData, ...args);
    } else {
      onUpdateRow && onUpdateRow(index, ...args);
    }
  };

  return (
    <Table>
      <Table.Header>
        {
          columnsConfig.map(({ columnName, ...otherProps }) => (
            <Table.HeaderItem
              key={columnName}
              {...otherProps}
            >
              {columnName}
            </Table.HeaderItem>
          ))
        }
        <Table.RowItem className="pw-line-item-table__remove"/>
      </Table.Header>
      <Table.Body>
        {
          rows.map((rowData, index) => (
            <Table.Row key={rowData.id} className="pw-line-item-table__row">
              {renderRow(index, rowData, (...args) => onChange(index, rowData, ...args))}
              <Table.RowItem className="pw-line-item-table__remove" columnName="Remove" hideLabel>
                <IconButton
                  className="pw-line-item-table__remove-button"
                  onClick={() => onRemoveRow && onRemoveRow(index)}
                >
                  <Icons.Trash />
                </IconButton>
              </Table.RowItem>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  );
};

LineItemTable.Row = LineItemTableRow;
LineItemTable.Item = LineItemTableRowItem;

export default LineItemTable;
