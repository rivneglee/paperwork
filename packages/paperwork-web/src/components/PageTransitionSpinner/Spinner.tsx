import React from 'react';

import { Spinner } from '@paperwork/ui-widgets';
import './Spinner.scss';

export default () => (
  <div className="pwapp-page-transition-spinner">
    <Spinner type="box" title="LOADING"/>
  </div>
);
