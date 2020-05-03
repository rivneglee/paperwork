import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

interface Props {
  className?: string;
}

export type BodyComponent = FunctionComponent<Props>;

const Body: BodyComponent = ({ children, className }) => (
  <div className={classNames('pw-table__body', className)}>
    { children }
  </div>
);

export default Body;
