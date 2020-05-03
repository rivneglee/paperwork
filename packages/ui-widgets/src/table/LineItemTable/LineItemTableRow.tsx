import React, { FunctionComponent, ReactElement } from 'react';
import { Table } from '../Table';

export interface LineItemTableColumnConfig {
  columnName: string;
  className?: string;
  hideLabel?: boolean;
}

interface Props {
  columnsConfig: LineItemTableColumnConfig[];
}

export interface LineItemTableRowComponent extends FunctionComponent<Props> {}

const LineItemTableRow: LineItemTableRowComponent = ({ children, columnsConfig }) => {
  const columns = children instanceof Array ? children : [children];
  return (
    <>
      {
        columns.map((columnElement: ReactElement, index) => (
          <Table.RowItem
            key={columnsConfig[index].columnName}
            {...columnsConfig[index]}
          >
            {columnElement}
          </Table.RowItem>
        ))
      }
    </>
  );
};

export default LineItemTableRow;
