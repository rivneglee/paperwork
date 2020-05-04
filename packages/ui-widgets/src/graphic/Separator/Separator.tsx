import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

const Separator: FunctionComponent<Props> = ({
  className,
}) => (
  <div className={
    classNames('pw-separator', className)
  }></div>
);

export default Separator;
