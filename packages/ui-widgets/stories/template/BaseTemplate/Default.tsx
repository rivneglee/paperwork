import React from 'react';

import { BaseTemplate, List, Icons, Card } from '../../../src';

export default () => (
  <BaseTemplate>
    <Card>
      <List>
        {
          Array.from({ length: 10 }).map(() => (
            <>
              <List.Item onClick={close} icon={<Icons.Form/>}>
                Forms
              </List.Item>
              <List.Item onClick={close} icon={<Icons.Chart/>}>
                Reports
              </List.Item>
            </>
          ))
        }
      </List>
    </Card>
  </BaseTemplate>
);
