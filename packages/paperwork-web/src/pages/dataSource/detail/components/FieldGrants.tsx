import React, { FunctionComponent } from 'react';
import {
  Drawer,
} from '@paperwork/ui-widgets';

interface Props {

}

const FieldGrants: FunctionComponent<Props> = () => {
  return (
    <Drawer header={<h3>Permission</h3>} isShow={true}>
      TEST
    </Drawer>
  );
};

export default FieldGrants;
