import React from 'react';

import { Spinner } from '@paperwork/ui-widgets';
import './Spinner.scss';

interface Props {
  title?: string;
  type?: 'box' | 'donut' | 'ellipsis';
}

export default ({
  title = 'LOADING',
  type = 'box',
}: Props) => (
  <div className="pwapp-page-transition-spinner">
    <Spinner type={type} title={title}/>
  </div>
);
