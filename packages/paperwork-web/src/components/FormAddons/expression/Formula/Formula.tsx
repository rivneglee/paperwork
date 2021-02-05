import React, { FunctionComponent } from 'react';

import { Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';

interface Props extends Item {}

const Formula: FunctionComponent<Props> = ({ value, id, mode, label, labelPlacement, ...item }) => {
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement}>
      xxx
    </LabelAccessor>
  );
};

export default Formula;
