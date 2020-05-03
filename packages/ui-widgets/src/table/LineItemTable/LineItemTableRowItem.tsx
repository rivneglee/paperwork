import React, { FunctionComponent } from 'react';

interface Props {}

export interface LineItemTableRowItemComponent extends FunctionComponent<Props> {}

const LineItemTableRowItem: LineItemTableRowItemComponent = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
}

export default LineItemTableRowItem;
