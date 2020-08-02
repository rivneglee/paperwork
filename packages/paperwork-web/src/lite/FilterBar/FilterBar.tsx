import React, { FunctionComponent } from 'react';
import { Card } from '@paperwork/ui-widgets';

import './FilterBar.scss';

const FilterBar:FunctionComponent =  ({ children }) => (
  <Card className="pwapp-lite-filterbar">
    { children }
  </Card >
);

export default FilterBar;
