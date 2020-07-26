import React, { FunctionComponent } from 'react';

import { Item, Button, Icons, FormMode } from '@paperwork/ui-widgets';
import '../Button.scss';

interface Props extends Item {}

const Submit: FunctionComponent<Props> = ({ id, label, onSubmit, mode }) => (
  mode === FormMode.READONLY ? <></> : (
    <Button
      className="pwapp-form-button"
      icon={<Icons.Submit/>}
      color="primary"
      key={id}
      onClick={onSubmit}
      disabled={mode === FormMode.READONLY}
    >
      {label}
    </Button>
  )
);

export default Submit;
