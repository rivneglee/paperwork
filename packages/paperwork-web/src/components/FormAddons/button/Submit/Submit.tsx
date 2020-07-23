import React, { FunctionComponent } from 'react';

import { Item, Button, Icons } from '@paperwork/ui-widgets';
import '../Button.scss';

interface Props extends Item {}

const Submit: FunctionComponent<Props> = ({ id, label, onSubmit }) => (
  <Button
    className="pwapp-form-button"
    icon={<Icons.Submit/>}
    color="primary"
    key={id}
    onClick={onSubmit}
  >
    {label}
  </Button>
);

export default Submit;
