import React, { FunctionComponent } from 'react';

interface Props {}

export type BodyComponent = FunctionComponent<Props>;

const Body: BodyComponent = ({ children }) => (
  <div className="pw-table__body">
    { children }
  </div>
);

export default Body;
