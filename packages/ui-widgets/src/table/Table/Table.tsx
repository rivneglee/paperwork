import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import Body, { BodyComponent } from './Body';
import Row, { RowComponent } from './Row';
import Header, { HeaderComponent } from './Header';
import RowItem, { RowItemComponent } from './RowItem';
import HeaderItem, { HeaderItemComponent } from './HeaderItem';

interface Props {
  className?: string;
}

interface TableComponent extends FunctionComponent<Props> {
  Body: BodyComponent;
  Row: RowComponent;
  Header: HeaderComponent;
  RowItem: RowItemComponent;
  HeaderItem: HeaderItemComponent;
}

const Table: TableComponent = ({ children, className }) => (
  <div className={classNames('pw-table__container', className)}>
    { children }
  </div>
);

Table.Body = Body;
Table.Row = Row;
Table.Header = Header;
Table.RowItem = RowItem;
Table.HeaderItem = HeaderItem;

export default Table;
