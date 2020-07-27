import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { Badge } from '../../graphic/Badge';

interface Props {
  className?: string;
  content: string | number | ReactElement;
}

const Balloon: FunctionComponent<Props> = ({
 children,
 content,
 className,
}) => (
  <span>
    {children}
    <Badge color="danger" className={classNames('pw-balloon', className)}>{content}</Badge>
  </span>
);

export default Balloon;
